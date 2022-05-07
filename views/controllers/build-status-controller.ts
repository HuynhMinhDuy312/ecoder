/**
 * Author: Nam Dinh
 * Created At: Wed Apr 13 2022
 * File name: build-status-controller.ts
 */

import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import buildStatusService from '@services/build-status-service';
import { awaitHandler } from './utils/await-handler';

const { CREATED, OK } = StatusCodes;

/**
 * Controller for Build Status
 */
class BuildStatusController {
    show = async (_: Request, res: Response) => {};

    create = async (req: Request, res: Response) => {
        const data = req.body;

        return awaitHandler(res, async () => {
            if (Array.isArray(data)) {
                const buildStatuses =
                    await buildStatusService.addMany(data);
                return res.status(CREATED).json(buildStatuses);
            } else {
                const buildStatus = await buildStatusService.addOne(
                    data
                );
                return res.status(CREATED).json(buildStatus);
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

export default new BuildStatusController();
