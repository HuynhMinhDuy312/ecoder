import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import userService from '@services/user-service';
import { awaitHandler } from './utils/await-handler';

const { CREATED, OK } = StatusCodes;

/**
 * Controller for user
 */
class UserController {
    show = async (_: Request, res: Response) => {
        const users = await userService.getAll();
        return res.status(OK).json({ users });
    };

    info = async (req: Request, res: Response) => {
        const result = await awaitHandler(res, async () => {
            const user = req.user;
            const userResult = await userService.getById(user);

            return res.status(OK).json(userResult);
        });

        return result;
    };
}

export default new UserController();
