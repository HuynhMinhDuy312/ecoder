/**
 * Author: Nam Dinh
 * Created At: Sat Apr 16 2022
 * File name: course-controller.js
 */

import courseService from '@services/course-service';
import _ from 'lodash';
import {
    createNoSubstitutionTemplateLiteral,
    isConstructorDeclaration,
} from 'typescript';
import utils from './utils';

class CourseController {
    fetchBySlug = async (slug, setCourse, setTransition) => {
        const result = await courseService.get(slug);

        result.totalTime = utils.convertSecondToViewedString(
            result.totalTime
        );
        const chapters = result.chapters;
        result.chapters = chapters.map((chapter) => {
            const lessons = chapter.lessons;

            if (lessons) {
                const newLessons = lessons.map((lesson) => ({
                    ...lesson,
                    totalTime: utils.convertSecondToViewedString(
                        lesson.totalTime
                    ),
                }));

                const newChapter = {
                    ...chapter,
                    totalTime: utils.convertSecondToViewedString(
                        chapter.totalTime
                    ),
                    lessons: newLessons,
                };

                return newChapter;
            }

            return {
                ...chapter,
                totalTime: utils.convertSecondToViewedString(
                    chapter.totalTime
                ),
            };
        });

        setTransition(() =>
            setCourse((course) => ({ ...course, ...result }))
        );
    };

    persist = async (courseSlug, setCourse, setTransition) => {
        const result = await courseService.persist(courseSlug);

        setTransition(() => {
            if (result && result != 'Unauthorized') {
                setCourse((course) => ({
                    ...course,
                    isRegistered: result.isRegistered,
                    isCompleted: result.isCompleted,
                }));
            } else {
                setCourse((course) => ({
                    ...course,
                    isRegistered: false,
                    isCompleted: false,
                }));
            }
        });

        return result;
    };

    register = async (courseId, setCourse) => {
        if (courseId) {
            const result = await courseService.register(courseId);

            setCourse((course) => ({
                ...course,
                isRegistered: result.status,
                followedQuantity: result.followedQuantity,
            }));
        }
    };

    submitReview = async (
        courseId,
        review,
        user,
        setCourse,
        setReview
    ) => {
        const result = await courseService.submitReview(
            courseId,
            review
        );

        if (result.status) {
            result.review.user = { displayName: user.displayName };

            setCourse((course) => ({
                ...course,
                reviews: [result.review, ...course.reviews].splice(
                    0,
                    3
                ),
                rating: result.newRating,
            }));

            setReview({
                content: '',
                rating: 0,
                title: '',
            });
        }

        return result;
    };

    // Lesson.js call
    fetchStudentCourse = async (
        slug,
        setCourse,
        setCurrentLessonIndex
    ) => {
        if (slug) {
            const result = await courseService.getStudentCourse(slug);

            if (result) {
                const course = result.course;
                course.totalTime = utils.convertSecondToViewedString(
                    course.totalTime
                );
                const chapters = course.chapters;
                course.chapters = chapters.map((chapter) => {
                    const lessons = chapter.lessons;

                    if (lessons) {
                        const newLessons = lessons.map((lesson) => ({
                            ...lesson,
                            totalTime:
                                utils.convertSecondToViewedString(
                                    lesson.totalTime
                                ),
                        }));

                        const newChapter = {
                            ...chapter,
                            totalTime:
                                utils.convertSecondToViewedString(
                                    chapter.totalTime
                                ),
                            lessons: newLessons,
                        };
                        return newChapter;
                    }

                    return {
                        ...chapter,
                        totalTime: utils.convertSecondToViewedString(
                            chapter.totalTime
                        ),
                    };
                });

                course.lastLesson = result.lastLesson;
                setCourse(course);
                setCurrentLessonIndex(result.lastLesson);
            }
        }
    };

    fetchTotalReviews = async (course, setTotalPages) => {
        const result = await courseService.getTotalReviews(
            course._id
        );

        if (!result.error) {
            setTotalPages(result.count);
        }
    };

    fetchReviews = async (course, page, setCourse) => {
        const result = await courseService.getReviews(
            course._id,
            page
        );

        if (result && !result.error) {
            setCourse((course) => ({
                ...course,
                reviews: result,
            }));
        }
    };

    completeLesson = async (slug, setCourse, onDone) => {
        try {
            const result = await courseService.completeLesson(slug);

            if (!result.error && !result.studentCourse.status) {
                setCourse((course) => {
                    const chapters = [...course.chapters];
                    const index = _.findIndex(
                        chapters,
                        (chapter) =>
                            chapter._id === result.nextLesson.chapter
                    );
                    const nextLesson = result.nextLesson;

                    if (index > -1) {
                        const lessonIndex = _.findIndex(
                            chapters[index].lessons,
                            (lesson) => lesson._id === nextLesson._id
                        );

                        if (lessonIndex > -1) {
                            chapters[index].lessons[lessonIndex] = {
                                ...nextLesson,
                                totalTime:
                                    utils.convertSecondToViewedString(
                                        nextLesson.totalTime
                                    ),
                            };
                        }
                    }

                    return {
                        ...course,
                        chapters,
                        lastLesson: nextLesson.position,
                    };
                });
            } else if (result.studentCourse.status) {
                setCourse((course) => ({
                    ...course,
                    isCompleted: true,
                }));
            }
            if (onDone) onDone();
        } catch (error) {
            if (onDone) onDone();
        }
    };

    getPopularCourse = async (setCourses) => {
        const result = await courseService.getPopularCourse();

        if (!result.error) {
            setCourses(result.courses);
        }
    };

    getTotalPage = async (query, setTotalPage) => {
        const result = await courseService.getTotalPage(query);

        if (!result.error) {
            setTotalPage(result.count);
        }
    };

    getAll = async (selectedPage, query, setCourses) => {
        const result = await courseService.getAll(
            selectedPage,
            query
        );

        if (!result.error) {
            setCourses(result.courses);
        }
    };

    getAllComments = async (lessonId, page, setComments) => {
        const result = await courseService.getAllComments(
            lessonId,
            page
        );

        if (!result.error) {
            setComments(result.comments);
        }
    };

    getCommentPages = async (lessonId, setTotalCommentPage) => {
        const result = await courseService.getCommentPages(lessonId);

        if (!result.error) {
            setTotalCommentPage(result.count);
        }
    };
}

export default CourseController;
