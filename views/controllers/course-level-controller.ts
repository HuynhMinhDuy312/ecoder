/**
 * Author: Nam Dinh
 * Created At: Thu Apr 14 2022
 * File name: course-level-controller.ts
 */

import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import courseLevelService from '@services/course-level-service';
import { awaitHandler } from './utils/await-handler';

const { CREATED, OK } = StatusCodes;

/**
 * Controller for course level
 */
class CourseLevelController {
    show = async (_: Request, res: Response) => {
        return awaitHandler(res, async () => {
            const courseLevels = await courseLevelService.getAll();
            return res.status(OK).json(courseLevels);
        });
    };

    create = async (req: Request, res: Response) => {
        const data = req.body;

        return awaitHandler(res, async () => {
            if (Array.isArray(data)) {
                const courseLevels = await courseLevelService.addMany(
                    data
                );

                return res.status(CREATED).json(courseLevels);
            } else {
                const courseLevel = await courseLevelService.addOne(
                    data
                );
                return res.status(CREATED).json(courseLevel);
            }
        });
    };

    index = async (req: Request, res: Response) => {
        throw new Error('Method not implemented.');
    };

    updateOne = async (req: Request, res: Response) => {
        throw new Error('Method not implemented.');
    };

    deleteOne = async (req: Request, res: Response) => {
        throw new Error('Method not implemented.');
    };
}

export default new CourseLevelController();
