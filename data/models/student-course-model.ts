/**
 * Author: Nam Dinh
 * Created At: Fri Apr 15 2022
 * File name: student-course-model.ts
 */

import mongoose from 'mongoose';

import { IStudentCourse } from '@model-types';

/**
 * Define Schema
 */
const studentCourseSchema = new mongoose.Schema<IStudentCourse>({
    startDate: Number,
    finishDate: Number,
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
    },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    lastLesson: { type: Number, default: 1 }, //Order of last lesson
    status: { type: Boolean, default: false }, // true: completed, false: in progress
});

/**
 * Define Model
 */
const StudentCourse = mongoose.model<IStudentCourse>(
    'StudentCourse',
    studentCourseSchema
);

// Export default Model
export default StudentCourse;
