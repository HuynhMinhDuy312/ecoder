/**
 * Author: Nam Dinh
 * Created At: Wed Apr 13 2022
 * File name: language-type.ts
 */

import mongoose from 'mongoose';
import { ILesson } from './lesson-type';

/**
 * Define interface ILessonNote
 */
export interface ILessonNote {
    _id: mongoose.Types.ObjectId;
    content: string;
    user: mongoose.Types.ObjectId;
    course: mongoose.Types.ObjectId;
    lesson: mongoose.Types.ObjectId | ILesson;
    time: number;
}
