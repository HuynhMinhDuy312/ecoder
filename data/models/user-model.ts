/**
 * Author: Nam Dinh
 * Created At: Thu Apr 07 2022
 * File name: user-model.ts.ts
 */

import mongoose from 'mongoose';

import { IUser } from '@model-types';

/**
 * Define Schema
 */

const userSchema = new mongoose.Schema<IUser>({
    displayName: String,
    email: String,
    username: String,
    password: String,
    role: { type: String, ref: 'Role', default: 'student' },
    token: String,
});

/**
 * Define User
 */
const User = mongoose.model<IUser>('User', userSchema);

// Export default User
export default User;
