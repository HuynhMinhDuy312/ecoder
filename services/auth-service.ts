/**
 * Author: Nam Dinh
 * Created At: Mon Apr 18 2022
 * File name: auth-service.ts
 */

import { IUser } from '@model-types';
import Student from '@models/student-model';
import User from '@models/user-model';
import unitOfWork from '@repos/unit-of-work';
import {
    AuthenticationFailedError,
    DuplicateUserError,
    UnauthorizedError,
    NotEnoughAgeError,
} from '@shared/errors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class AuthService {
    #hashPassword = async (password: string) => {
        const saltRounds = 10;

        return await bcrypt.hash(password, saltRounds);
    };

    #getAccessToken = (user: IUser): string => {
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET as string,
            {
                algorithm: 'HS384',
                expiresIn: '24h',
            }
        );

        return token;
    };

    #comparePassword = async (
        password: string,
        hashPassword: string
    ): Promise<boolean> => {
        const result = await bcrypt.compare(password, hashPassword);

        return result;
    };

    signIn = async (
        username: string,
        password: string
    ): Promise<IUser | null> => {
        const options = {
            username,
        };

        const user = await unitOfWork.userRepo.get(options);

        if (!user) throw new AuthenticationFailedError();

        const isMatchPassword = await this.#comparePassword(
            password,
            user.password as string
        );

        if (!isMatchPassword) throw new AuthenticationFailedError();

        const token = this.#getAccessToken(user);
        user.token = token;

        const signedInUser = await unitOfWork.userRepo.update(
            { _id: user._id },
            user
        );

        return new User({
            username: user.username,
            displayName: user.displayName,
            email: user.email,
            token: token,
            role: user.role,
        });
    };

    signUp = async (user: any) => {
        const exists = await unitOfWork.userRepo.persist({
            username: user.username,
        });

        if (exists) throw new DuplicateUserError();

        const objUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            displayName: `${user.firstName} ${user.lastName}`,
            email: user.email,
            dob: user.dob || null,
            username: user.username,
            role: 'student',
            password: await this.#hashPassword(user.password),
        };

        if (objUser.dob) {
            const now = new Date();
            const dob = new Date(objUser.dob);
            const age = now.getFullYear() - dob.getFullYear();

            if (age < 8) {
                throw new NotEnoughAgeError();
            }
        }

        
        const savedUser = await unitOfWork.userRepo.add(
            new User(objUser)
        );

        const savedStudent = await unitOfWork.studentRepo.add(
            new Student({
                ...objUser,
                _id: savedUser._id,
            })
        );
        const token = this.#getAccessToken(savedUser);
        savedUser.token = token;

        const signedInUser = await unitOfWork.userRepo.update(
            { _id: savedUser._id },
            savedUser
        );
        savedUser.password = undefined;

        return savedUser;
    };

    signOut = async (user: any) => {
        if (!user) {
            throw new UnauthorizedError();
        }

        const username = user.userName;
        const userToUpdate = new User({
            token: null,
        });
        const updatedUser = await unitOfWork.userRepo.update(
            { username },
            userToUpdate
        );
    };

    verifyToken = async (_id: string): Promise<IUser> => {
        const user = await unitOfWork.userRepo.get({ _id });

        if (!user) throw new AuthenticationFailedError();

        user.password = undefined;

        return user;
    };
}

export default new AuthService();
