/**
 * Author: Nam Dinh
 * Created At: Wed Apr 13 2022
 * File name: course-level-model.ts
 */

import mongoose from 'mongoose';

import { ICourseLevel } from '@model-types';

/**
 * Define Schema
 */
const courseLevelSchema = new mongoose.Schema<ICourseLevel>({
    _id: String, // advanced: Trình độ nâng cao, easy: Trình độ cơ bản
    description: String,
});

/**
 * Define Model
 */
const CourseLevel = mongoose.model<ICourseLevel>(
    'CourseLevel',
    courseLevelSchema
);

// Export default Model
export default CourseLevel;
