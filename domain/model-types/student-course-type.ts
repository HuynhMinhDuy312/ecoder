/**
 * Author: Nam Dinh
 * Created At: Fri Apr 15 2022
 * File name: student-course-type.ts
 */

import mongoose from 'mongoose';
import { IStudent, ICourse } from '.';

/**
 * Define interface IStudentCourse
 */
export interface IStudentCourse {
    _id: mongoose.Types.ObjectId;
    startDate: number;
    finishDate: number;
    student: mongoose.Types.ObjectId | IStudent;
    course: mongoose.Types.ObjectId | ICourse;
    lastLesson: number; //Order of last lesson
    status: boolean; // true: completed, false: in progress
}
