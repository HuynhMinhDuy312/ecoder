/**
 * Author: Nam Dinh
 * Created At: Wed Apr 13 2022
 * File name: course-model.ts
 */

import mongoose from 'mongoose';

import { ICourse } from '@model-types';

/**
 * Define Schema
 */
const courseSchema = new mongoose.Schema<ICourse>({
    _id: mongoose.Schema.Types.ObjectId,
    createdAt: Number,
    updatedAt: Number, // Timestamp
    name: String,
    image: String,
    language: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Language',
    },
    slug: String,
    level: { type: String, ref: 'CourseLevel', default: 'easy' },
    introduction: String, // Short description
    status: {
        type: String,
        ref: 'BuildStatus',
        default: 'in-progress',
    }, // 1: completed, 2: in-progress
    objectives: [{ type: String }], // Objective of the course
    requirements: [{ type: String }], // Requirements for students
    chapterQuantity: { type: Number, default: 0 }, // Number of chapters in the course
    lessonQuantity: { type: Number, default: 0 }, // Number of lessons in the course
    totalTime: { type: Number, default: 0 }, // Number of minutes
    completedQuantity: { type: Number, default: 0 }, // Number of students who completed this course
    followedQuantity: { type: Number, default: 0 }, // Number of students who followed this course
    ratingTotal: { type: Number, default: 0 }, // Average rating of this course
    ratingQuantity: { type: Number, default: 0 }, // Number of ratings of this course
    isDeleted: { type: Boolean, default: false },
    chapters: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' },
    ],
});

/**
 * Define Course
 */
const Course = mongoose.model<ICourse>('Course', courseSchema);

// Export default Course
export default Course;
