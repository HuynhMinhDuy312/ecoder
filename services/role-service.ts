/**
 * Author: Nam Dinh
 * Created At: Mon Apr 18 2022
 * File name: role-service.ts
 */

import { IRole } from '@model-types';
import Role from '@models/role-model';
import unitOfWork from '@repos/unit-of-work';

class RoleService {
    addOne = async (objRole: any): Promise<IRole> => {
        const role = new Role(objRole);
        const newRole = await unitOfWork.roleRepo.addOne(role);

        return newRole;
    };
}

export default new RoleService();
