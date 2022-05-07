/**
 * Author: Nam Dinh
 * Created At: Sat Apr 16 2022
 * File name: chapter-controller.ts
 */

import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import chapterService from '@services/chapter-service';
import { awaitHandler } from './utils/await-handler';

const { CREATED, OK } = StatusCodes;

/**
 * Controller for chapter
 */
class ChapterController {
    showByCourseId = async (req: Request, res: Response) => {
        const courseId = req.query.courseId as string | undefined;

        return awaitHandler(res, async () => {
            const chapters = await chapterService.getByCourseId(
                courseId
            );

            return res.status(OK).json(chapters);
        });
    };

    create = async (req: Request, res: Response) => {
        const data = req.body;

        return awaitHandler(res, async () => {
            let result;

            if (data.chapters) {
                const chapters = data.chapters as any[];
                const courseId = data.courseId as string;

                result = await chapterService.addMany(
                    chapters,
                    courseId
                );
            } else {
                result = await chapterService.addOne(data);
            }

            return res.status(CREATED).json(result);
        });
    };

    index = async (req: Request, res: Response) => {
        const id = req.params.id;

        return awaitHandler(res, async () => {
            const chapter = await chapterService.getById(id);

            return res.status(OK).json(chapter);
        });
    };

    updateOne = async (req: Request, res: Response) => {
        throw new Error('Method not implemented.');
    };

    deleteOne = async (req: Request, res: Response) => {
        throw new Error('Method not implemented.');
    };
}

export default new ChapterController();
