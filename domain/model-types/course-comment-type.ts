/**
 * Author: Nam Dinh
 * Created At: Thu May 05 2022
 * File name: course-comment-type.ts
 */

import mongoose from 'mongoose';
import { IUser } from '@model-types';

/**
 * Define interface ICourseComment
 */
export interface ICourseComment {
    _id: mongoose.Types.ObjectId;
    createdAt: number;
    content: string;
    courseComment: mongoose.Types.ObjectId | ICourseComment;
    user: mongoose.Types.ObjectId | IUser;
    lesson: mongoose.Types.ObjectId;
    children: mongoose.Types.ObjectId[] | ICourseComment[];
}
