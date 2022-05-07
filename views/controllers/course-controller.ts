/**
 * Author: Nam Dinh
 * Created At: Wed Apr 13 2022
 * File name: course-controller.ts
 */

import StatusCodes from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import _ from 'lodash';

import courseService from '@services/course-service';
import { awaitHandler } from './utils/await-handler';

const { CREATED, OK } = StatusCodes;

/**
 * Controller for user
 */
class CourseController {
    showByQuery = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const query = req.query;

        if (!_.isEmpty(query)) {
            if (query.popular != undefined) {
                return awaitHandler(res, async () => {
                    const courses =
                        await courseService.getPopularCourses();
                    return res.status(OK).json(courses);
                });
            } else {
                return awaitHandler(res, async () => {
                    const courses = await courseService.getAll(query);
                    return res.status(OK).json(courses);
                });
            }
        } else {
            return next();
        }
    };

    getCoursePages = async (req: Request, res: Response) => {
        const query = req.query;

        const result = awaitHandler(res, async () => {
            const course = await courseService.getCoursePages(query);

            return res.status(OK).json(course);
        });

        return result;
    };

    index = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const slug = req.params.slug;

        if (slug) {
            return awaitHandler(res, async () => {
                const course = await courseService.getBySlug(slug);

                return res.status(OK).json(course);
            });
        }
        return next();
    };

    indexStudentCourse = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const slug = req.params.slug;
        const user = req.user as any;

        if (slug) {
            return awaitHandler(res, async () => {
                const course = await courseService.getStudentCourse(
                    slug,
                    user._id
                );

                return res.status(OK).json(course);
            });
        }
        return next();
    };

    completeStudentCourse = async (req: Request, res: Response) => {
        const slug = req.params.slug;
        const user = req.user as any;

        if (slug) {
            return awaitHandler(res, async () => {
                const result =
                    await courseService.updateCompletedLesson(
                        slug,
                        user._id
                    );

                return res.status(OK).json(result);
            });
        }
    };

    isRegistered = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const slug = req.query.slug as string;
        const user = req.user;

        if (slug) {
            return awaitHandler(res, async () => {
                const result = await courseService.isRegistered(
                    slug,
                    user
                );

                return res.status(OK).json(result);
            });
        }
        return next();
    };

    register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const id = req.query.id as string;
        const user = req.user as any;

        if (id) {
            return awaitHandler(res, async () => {
                const result = await courseService.registerCourse(
                    id,
                    user._id || ''
                );

                return res.status(OK).json(result);
            });
        }
        return next();
    };

    create = async (req: Request, res: Response) => {
        const data = req.body;

        return awaitHandler(res, async () => {
            const course = await courseService.addOne(data);
            return res.status(OK).json(course);
        });
    };

    createReview = async (req: Request, res: Response) => {
        const data = req.body as any;
        const user = req.user as any;
        const courseId = req.query.id;

        return awaitHandler(res, async () => {
            const result = await courseService.addReview(
                user,
                data,
                courseId as string
            );

            return res.status(OK).json(result);
        });
    };

    getReviews = async (req: Request, res: Response) => {
        const { courseId, page, perPage } = req.query;

        const result = await awaitHandler(res, async () => {
            const reviews = await courseService.getReviewsPage(
                courseId as string,
                parseInt(page as string),
                parseInt(perPage as string)
            );

            return res.status(OK).json(reviews);
        });

        return result;
    };

    getReviewPages = async (req: Request, res: Response) => {
        const { courseId, perPage } = req.query;

        const result = await awaitHandler(res, async () => {
            const pages = await courseService.countReviewPages(
                courseId as string,
                parseInt(perPage as string)
            );

            return res.status(OK).json(pages);
        });

        return result;
    };

    updateOne = async (req: Request, res: Response) => {
        throw new Error('Method not implemented.');
    };

    deleteOne = async (req: Request, res: Response) => {
        throw new Error('Method not implemented.');
    };

    getCommentPage = async (req: Request, res: Response) => {
        const { lessonId, page, perPage } = req.query;

        const result = await awaitHandler(res, async () => {
            const comments = await courseService.getCommentPage(
                lessonId as string,
                parseInt(page as string),
                parseInt(perPage as string)
            );

            return res.status(OK).json(comments);
        });

        return result;
    };

    countCommentPages = async (req: Request, res: Response) => {
        const { lessonId, perPage } = req.query;

        const result = await awaitHandler(res, async () => {
            const pages = await courseService.countCommentPages(
                lessonId as string,
                parseInt(perPage as string)
            );

            return res.status(OK).json(pages);
        });

        return result;
    };

    postComment = async (req: Request, res: Response) => {
        const { lessonId, content, parentId } = req.body;
        const user = req.user as any;

        return awaitHandler(res, async () => {
            const result = await courseService.addComment(
                user,
                lessonId as string,
                content as string,
                parentId as string
            );

            return res.status(OK).json(result);
        });
    };
}

export default new CourseController();
