/**
 * Author: Nam Dinh
 * Created At: Mon Apr 18 2022
 * File name: auth-controller.ts
 */

import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import authService from '@services/auth-service';
import { awaitHandler } from './utils/await-handler';

const { CREATED, OK } = StatusCodes;

/**
 * Controller for authentication
 */
class AuthController {
    signIn = async (req: Request, res: Response) => {
        const username = req.body.username;
        const password = req.body.password;

        return awaitHandler(res, async () => {
            const user = await authService.signIn(username, password);

            return res.status(OK).json(user);
        });
    };

    signUp = async (req: Request, res: Response) => {
        const user = req.body;

        return awaitHandler(res, async () => {
            const newUser = await authService.signUp(user);

            return res.status(CREATED).json(newUser);
        });
    };

    signOut = async (req: Request, res: Response) => {
        return awaitHandler(res, async () => {
            await authService.signOut(req.user);

            return res
                .status(OK)
                .json({ message: 'Sign out successfully' });
        });
    };
}

export default new AuthController();
