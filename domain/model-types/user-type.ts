/**
 * Author: Nam Dinh
 * Created At: Thu Apr 07 2022
 * File name: user-model.ts.ts
 */

import mongoose from 'mongoose';

/**
 * Define interface User
 */
export interface IUser {
    _id: mongoose.Types.ObjectId;
    displayName: string;
    email: string;
    username: string;
    password?: string;
    role: string;
    token: string;
}
