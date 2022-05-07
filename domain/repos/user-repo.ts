/**
 * Author: Nam Dinh
 * Created At: Thu Apr 07 2022
 * File name: user-repo.ts
 */

import { IUser } from '@model-types';

export interface IUserRepo {
    persist(options: any): Promise<boolean>;
    get(options: any): Promise<IUser | null>;
    getAll(): Promise<IUser[]>;
    getById(id: string, select?: string): Promise<IUser | null>;
    add(iUser: IUser): Promise<IUser>;
    update(condition: any, iUser: IUser): Promise<number>;
    delete(id: string): Promise<number>;
}
