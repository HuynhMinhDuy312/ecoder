/**
 * Author: Nam Dinh
 * Created At: Mon Apr 18 2022
 * File name: role-repo.ts
 */

import { ObjectId } from 'mongodb';
import { HydratedDocument } from 'mongoose';
import { IRole } from '@model-types';
import { IRoleRepo } from '@irepos';

import Role from '@models/role-model';

class RoleRepo implements IRoleRepo {
    async addOne(role: IRole): Promise<IRole> {
        const newRole: HydratedDocument<IRole> = role;

        return await Role.create(newRole);
    }
}

export default RoleRepo;
