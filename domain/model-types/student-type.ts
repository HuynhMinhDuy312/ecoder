/**
 * Author: Nam Dinh
 * Created At: Thu Apr 07 2022
 * File name: student-model.ts.ts
 */

import mongoose from 'mongoose';
import { IUser, ICourse } from '.';

/**
 * Define interface IStudent
 */
export interface IStudent extends IUser {
    _id: mongoose.Types.ObjectId;
    firstName: string;
    lastName: string;
    dob: number;
    facebook: string;
    google: string;

    savedCourses: mongoose.Types.ObjectId[] | ICourse[];
    favoriteCourses: mongoose.Types.ObjectId[] | ICourse[];
}
