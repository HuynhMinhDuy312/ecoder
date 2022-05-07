/**
 * Author: Nam Dinh
 * Created At: Mon Apr 18 2022
 * File name: role-repo.ts
 */

import { IRole } from '@model-types';

export interface IRoleRepo {
    addOne(role: IRole): Promise<IRole>;
}
