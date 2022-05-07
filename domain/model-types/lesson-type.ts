/**
 * Author: Nam Dinh
 * Created At: Fri Apr 15 2022
 * File name: lesson-type.ts
 */

import mongoose from 'mongoose';
import { ICourse, IChapter } from '.';

/**
 * Define interface ILesson
 */
export interface ILesson {
    _id: mongoose.Types.ObjectId;
    createdAt: number;
    updatedAt: number;
    name: string;
    content?: string;
    media: string; //video, text
    totalTime: number; //in seconds
    position: number;
    chapter: mongoose.Types.ObjectId | IChapter;
    course: mongoose.Types.ObjectId | ICourse;
}
