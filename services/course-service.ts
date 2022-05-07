/**
 * Author: Nam Dinh
 * Created At: Wed Apr 13 2022
 * File name: course-service.ts
 */

import {
    IChapter,
    ICourse,
    ILesson,
    IStudentCourse,
} from '@model-types';
import Course from '@models/course-model';
import CourseReview from '@models/course-review-model';
import StudentCourse from '@models/student-course-model';
import CourseComment from '@models/course-comment-model';
import User from '@models/user-model';

import unitOfWork from '@repos/unit-of-work';
import { ParamMissingError, UnauthorizedError } from '@shared/errors';
import slugify from 'slugify';

class CourseService {
    getAll = async (query: any): Promise<any> => {
        const perPage = parseInt(query.perPage) || 9;
        const page = query.page || 1;
        const search = query.q;
        const lang = query.lang;
        const options: any = {
            status: { $ne: 'deleted' },
            limit: perPage,
            skip: (page - 1) * perPage,
        };

        if (lang) {
            const language = await unitOfWork.languageRepo.getBySlug(
                lang
            );

            if (!language)
                return { error: 'Không tồn tại ngôn ngữ này' };

            options.language = language._id;
        }

        if (search) {
            options.name = { $regex: search, $options: 'i' };
        }

        const courses = await unitOfWork.courseRepo.getAll(options, {
            followedQuantity: 'desc',
        });
        console.log(courses, options);
        return { courses };
    };

    getCoursePages = async (query: any): Promise<any> => {
        const perPage = query.perPage || 9;
        const search = query.q;
        const lang = query.lang;
        const options: any = {
            status: { $ne: 'deleted' },
        };

        if (lang) {
            const language = await unitOfWork.languageRepo.getBySlug(
                lang
            );

            if (!language)
                return { error: 'Không tồn tại ngôn ngữ này' };

            options.language = language._id;
        }

        if (search) {
            options.name = { $regex: search, $options: 'i' };
        }

        const count = await unitOfWork.courseRepo.count(options);

        return { count: Math.ceil(count / perPage) };
    };

    getPopularCourses = async (): Promise<any> => {
        let courses = await unitOfWork.courseRepo.getAll(
            {
                status: { $ne: 'deleted' },
                limit: 10,
            },
            {
                followedQuantity: 'desc',
            }
        );

        courses = courses.map((course) => {
            if (
                course &&
                course.ratingQuantity &&
                course.ratingQuantity > 0
            ) {
                course.rating =
                    Math.round(
                        ((course.ratingTotal || 0) * 100) /
                            course.ratingQuantity
                    ) / 100;
            }
            return course;
        });

        return { courses };
    };

    getById = async (id: string): Promise<ICourse | null> => {
        const course = await unitOfWork.courseRepo.getById(id);

        if (
            course &&
            course.ratingQuantity &&
            course.ratingQuantity > 0
        ) {
            course.rating =
                Math.round(
                    ((course.ratingTotal || 0) * 100) /
                        course.ratingQuantity
                ) / 100;
        }

        return course;
    };

    getBySlug = async (slug: string): Promise<ICourse | null> => {
        const course = await unitOfWork.courseRepo.get(
            {
                slug: slug,
            },
            'position name media totalTime'
        );

        if (
            course &&
            course.ratingQuantity &&
            course.ratingQuantity > 0
        ) {
            course.rating =
                Math.round(
                    ((course.ratingTotal || 0) * 100) /
                        course.ratingQuantity
                ) / 100;
        }

        return course;
    };

    getStudentCourse = async (
        slug: string,
        studentId: string
    ): Promise<any | null> => {
        if (studentId == '') {
            throw new UnauthorizedError();
        }

        const result = await unitOfWork.courseRepo.get({
            slug: slug,
        });

        if (!result) return result;

        const courseId = result._id.toString();
        const studentCourse = await unitOfWork.studentCourseRepo.get({
            courseId,
            studentId,
        });

        if (!studentCourse) return null;

        const lastLesson = studentCourse.lastLesson;
        const chapters = result.chapters as IChapter[];

        result.chapters = chapters.map((chapter: IChapter) => {
            const lessons = chapter.lessons as ILesson[];

            if (lessons) {
                chapter.lessons = lessons.map((lesson: ILesson) => {
                    if (lesson.position > lastLesson) {
                        lesson.content = undefined;
                    }

                    return lesson;
                });
            }

            return chapter;
        });

        return {
            course: result,
            lastLesson: studentCourse.lastLesson,
        };
    };

    addOne = async (objCourse: any): Promise<ICourse | null> => {
        const newCourse: ICourse = new Course({
            ...objCourse,
            slug: slugify(objCourse.name, {
                lower: true,
                locale: 'vi',
            }),
        });

        const course: ICourse = await unitOfWork.courseRepo.addOne(
            newCourse
        );

        return course;
    };

    addReview = async (
        user: any,
        review: any,
        courseId?: string
    ): Promise<any> => {
        if (!user || !user._id) {
            throw new UnauthorizedError();
        }

        if (!courseId) {
            throw new ParamMissingError();
        }

        const course = await unitOfWork.courseRepo.getById(courseId);

        let result = {
            status: false,
            msg: 'Thêm thất bại',
            review: undefined as any,
            newRating: 0,
        };

        if (!course) {
            result.msg = 'Khóa học không tồn tại';
        } else {
            await unitOfWork.runTransaction(async () => {
                const newReview = new CourseReview({
                    ...review,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                    userId: user._id,
                    courseId,
                });

                const reviewResult =
                    await unitOfWork.courseReviewRepo.addOne(
                        newReview
                    );

                course.ratingTotal += reviewResult.rating;
                course.ratingQuantity += 1;

                course.rating =
                    Math.round(
                        ((course.ratingTotal || 0) * 100) /
                            course.ratingQuantity
                    ) / 100;

                await unitOfWork.courseRepo.updateOne(course);

                result = {
                    status: true,
                    msg: 'Thêm thành công',
                    review: reviewResult,
                    newRating: course.rating,
                };
            });
        }

        return result;
    };

    getReviewsPage = async (
        id: string,
        page: number,
        perPage: number
    ): Promise<any> => {
        const reviews = await unitOfWork.courseReviewRepo.getAll({
            course: id,
            limit: perPage,
            skip: (page - 1) * perPage,
        });

        return reviews;
    };

    countReviewPages = async (
        id: string,
        perPage: number
    ): Promise<any> => {
        const count = await unitOfWork.courseReviewRepo.countReviews({
            course: id,
        });

        return { count: Math.ceil(count / perPage) };
    };

    isRegistered = async (slug: string, user: any): Promise<any> => {
        if (!user) {
            throw new UnauthorizedError();
        }

        const course = await unitOfWork.courseRepo.get({
            slug: slug,
        });

        let result = {
            isRegistered: false,
            isCompleted: false,
            msg: 'Chưa đăng ký',
        };

        if (!course) {
            result.msg = 'Khóa học không tồn tại';
        } else {
            const courseId = course._id.toString();
            const studentCourse =
                await unitOfWork.studentCourseRepo.get({
                    course: courseId,
                    student: user._id,
                });

            if (studentCourse) {
                result.isRegistered = true;
                result.isCompleted = studentCourse.status;
            }
        }

        return result;
    };

    registerCourse = async (
        courseId: string,
        studentId: string
    ): Promise<any> => {
        if (studentId == '') {
            throw new UnauthorizedError();
        }

        const persist = await unitOfWork.studentCourseRepo.persist({
            course: courseId,
            student: studentId,
        });

        let result = {
            status: true,
            msg: 'Register course successfully',
            followedQuantity: 0,
        };

        if (persist) {
            result = {
                status: false,
                msg: "You've already registered this course",
                followedQuantity: 0,
            };
        } else {
            const course = await unitOfWork.courseRepo.getById(
                courseId
            );

            if (!course) {
                result = {
                    status: false,
                    msg: "Course doesn't exist",
                    followedQuantity: 0,
                };
            } else {
                await unitOfWork.runTransaction(async () => {
                    course.followedQuantity += 1;
                    await unitOfWork.courseRepo.updateOne(course);

                    const newStudentCourse: IStudentCourse =
                        new StudentCourse({
                            startDate: new Date().getTime(),
                            course: courseId,
                            student: studentId,
                        });
                    const newStudentCourseResult =
                        await unitOfWork.studentCourseRepo.addOne(
                            newStudentCourse
                        );
                    result.followedQuantity = course.followedQuantity;
                });
            }
        }

        return result;
    };

    updateCompletedLesson = async (
        slug: string,
        studentId: string
    ): Promise<any> => {
        const nullableCourse = await unitOfWork.courseRepo.get({
            slug,
        });

        if (!nullableCourse)
            return { error: 'Khóa học không tồn tại' };

        const course = nullableCourse as ICourse;

        const studentCourse = await unitOfWork.studentCourseRepo.get({
            course: course._id,
            student: studentId,
        });

        if (!studentCourse) return { error: 'Chưa đăng ký khóa học' };

        let nextLesson = null;

        if (course.lessonQuantity === studentCourse.lastLesson) {
            studentCourse.status = true;
            studentCourse.finishDate = new Date().getTime();
            course.completedQuantity += 1;
            await unitOfWork.courseRepo.updateOne(course);
        } else {
            const nextLessonPosition = studentCourse.lastLesson + 1;
            studentCourse.lastLesson = nextLessonPosition;

            nextLesson = await unitOfWork.lessonRepo.get({
                position: nextLessonPosition,
                course: studentCourse.course,
            });
        }

        const newStudentCourse =
            await unitOfWork.studentCourseRepo.updateOne(
                studentCourse
            );

        return {
            studentCourse,
            nextLesson,
        };
    };

    updateOne = async (objCourse: any): Promise<number> => {
        const newCourse: ICourse = new Course(objCourse);

        return await unitOfWork.courseRepo.updateOne(newCourse);
    };

    deleteOne = async (id: string): Promise<number> => {
        return await unitOfWork.courseRepo.deleteOne(id);
    };

    countCommentPages = async (
        lessonId: string,
        perPage: number
    ): Promise<any> => {
        const count = await unitOfWork.courseCommentRepo.count({
            lesson: lessonId,
        });

        return { count: Math.ceil(count / perPage) };
    };

    getCommentPage = async (
        lessonId: string,
        page: number,
        perPage: number
    ): Promise<any> => {
        const comments = await unitOfWork.courseCommentRepo.getAll({
            lesson: lessonId,
            limit: perPage,
            skip: (page - 1) * perPage,
            courseComment: null,
        });

        return { comments };
    };

    addComment = async (
        user: any,
        lessonId: string,
        content: string,
        parentId: string
    ): Promise<any> => {
        if (!user) return { error: 'Unauthenticated' };

        const courseComment = new CourseComment({
            createdAt: Date.now(),
            content,
            lesson: lessonId,
            user: user._id,
            courseComment: parentId || null,
        });

        const newCourseComment =
            await unitOfWork.courseCommentRepo.addOne(courseComment);
        newCourseComment.user = new User(user);

        if (parentId) {
            const parentComment =
                await unitOfWork.courseCommentRepo.getById(parentId);

            if (!parentComment)
                return { error: 'Không tìm thấy comment gốc' };

            parentComment.children = [
                ...parentComment.children,
                newCourseComment._id,
            ];

            await unitOfWork.courseCommentRepo.updateOne(
                parentComment
            );
        }

        return { success: !!courseComment, comment: courseComment };
    };
}

export default new CourseService();
