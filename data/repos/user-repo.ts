/**
 * Author: Nam Dinh
 * Created At: Thu Apr 07 2022
 * File name: user-repo.ts
 */

import { IUser } from '@model-types';
import { IUserRepo } from '@irepos';

import User from '@models/user-model';
import { HydratedDocument } from 'mongoose';

class UserRepo implements IUserRepo {
    async persist(options: any): Promise<boolean> {
        const user = await User.findOne(options);

        return !!user;
    }

    async get(options: any): Promise<IUser | null> {
        const user = await User.findOne(options).lean();

        return user;
    }

    async getAll(): Promise<IUser[]> {
        return await User.find().lean();
    }

    async getById(id: string, select?: any): Promise<IUser | null> {
        const query = User.findById(id).lean();

        if (select) {
            query.select(select);
        }
        
        const user = await query;
        
        return user;
    }

    async add(iUser: IUser): Promise<IUser> {
        const user: HydratedDocument<IUser> = iUser;

        return await User.create(user);
    }

    async update(condition: any, iUser: IUser): Promise<number> {
        return await User.update(condition, iUser);
    }

    async delete(id: string): Promise<number> {
        return await User.deleteOne({ _id: id });
    }
}

export default UserRepo;
