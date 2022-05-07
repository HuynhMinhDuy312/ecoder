/**
 * Author: Nam Dinh
 * Created At: Mon Apr 18 2022
 * File name: role-controller.ts
 */

import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import roleService from '@services/role-service';
import { awaitHandler } from './utils/await-handler';

const { CREATED, OK } = StatusCodes;

/**
 * Controller for user
 */
class RoleController {
    create = async (req: Request, res: Response) => {
        const data = req.body;

        const result = await awaitHandler(res, async () => {
            const newRole = roleService.addOne(data);
            return res.status(CREATED).json(newRole);
        });

        return result;
    };
}

export default new RoleController();
