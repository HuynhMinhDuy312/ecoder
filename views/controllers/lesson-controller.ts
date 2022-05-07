/**
 * Author: Nam Dinh
 * Created At: Fri Apr 15 2022
 * File name: lesson-controller.ts
 */

import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';

import lessonService from '@services/lesson-service';
import { awaitHandler } from './utils/await-handler';

const { CREATED, OK } = StatusCodes;

/**
 * Controller for lesson
 */
class LessonController {
    show = async (_: Request, res: Response) => {
        return awaitHandler(res, async () => {
            const lessons = await lessonService.getAll();
            return res.status(OK).json(lessons);
        });
    };

    showByCourseId = async (req: Request, res: Response) => {
        const courseId = req.query.courseId as string;

        return awaitHandler(res, async () => {
            const lessons = await lessonService.getByCourseId(
                courseId
            );

            return res.status(OK).json(lessons);
        });
    };

    create = async (req: Request, res: Response) => {
        const data = req.body;

        return awaitHandler(res, async () => {
            let result;

            if (data.lessons) {
                const lessons = data.lessons as any[];
                const courseId = data.courseId as string;
                const chapterId = data.chapterId as string;

                result = await lessonService.addMany(
                    lessons,
                    courseId,
                    chapterId
                );
            } else {
                result = await lessonService.addOne(data);
            }

            return res.status(CREATED).json(result);
        });
    };

    index = async (req: Request, res: Response) => {
        const id = req.params.id;

        return awaitHandler(res, async () => {
            const lesson = await lessonService.getById(id);

            return res.status(OK).json(lesson);
        });
    };

    updateOne = async (req: Request, res: Response) => {
        throw new Error('Method not implemented.');
    };

    deleteOne = async (req: Request, res: Response) => {
        throw new Error('Method not implemented.');
    };
}

export default new LessonController();
