/**
 * Author: Nam Dinh
 * Created At: Sun Apr 17 2022
 * File name: course-review-type.ts
 */

import mongoose from 'mongoose';
import { IUser, ICourse } from '@model-types';

/**
 * Define interface ICourseReview
 */
export interface ICourseReview {
    _id: mongoose.Types.ObjectId;
    createdAt: number;
    updatedAt: number;
    content: string;
    rating: number;
    title: string;
    course: mongoose.Types.ObjectId | ICourse;
    user: mongoose.Types.ObjectId | IUser;
}
