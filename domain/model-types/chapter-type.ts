/**
 * Author: Nam Dinh
 * Created At: Fri Apr 15 2022
 * File name: chapter-type.ts
 */

import mongoose from 'mongoose';
import { ICourse, ILesson } from '.';

/**
 * Define interface IChapter
 */
export interface IChapter {
    _id: mongoose.Types.ObjectId;
    createdAt: number;
    updatedAt: number;
    name: string;
    lessonQuantity: number;
    totalTime: number; // in seconds
    position: number;
    course: mongoose.Types.ObjectId | ICourse;
    lessons: mongoose.Types.ObjectId[] | ILesson[];
}
