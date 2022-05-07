/**
 * Author: Nam Dinh
 * Created At: Wed Apr 13 2022
 * File name: course-type.ts
 */

import mongoose from 'mongoose';
import { IChapter } from '.';

/**
 * Define interface ICourse
 */
export interface ICourse {
    _id: mongoose.Types.ObjectId;
    createdAt: number;
    updatedAt: number; // Timestamp
    language: mongoose.Types.ObjectId;
    slug: string;
    name: string;
    image: string;
    level: string;
    introduction: string; // Short description
    objectives: string[]; // Objective of the course
    requirements: string[]; // Requirements for students
    status: String; // complete: Hoàn thành, in-progress: Đang tiến hành, deleted: Đã xóa
    chapterQuantity: number; // Number of chapters in the course
    lessonQuantity: number; // Number of lessons in the course
    totalTime: number; // Number of minutes
    completedQuantity: number; // Number of students who completed this course
    followedQuantity: number; // Number of students who followed this course
    rating: number;
    ratingTotal: number; // Total rating of this course
    ratingQuantity: number;
    chapters: mongoose.Types.ObjectId[] | IChapter[];
}
