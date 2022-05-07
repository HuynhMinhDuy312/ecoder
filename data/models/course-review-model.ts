/**
 * Author: Nam Dinh
 * Created At: Sun Apr 17 2022
 * File name: course-review-model.ts
 */

import mongoose, { Schema } from 'mongoose';

import { ICourseReview } from '@model-types';

/**
 * Define Schema
 */
const courseReviewSchema = new mongoose.Schema<ICourseReview>({
    createdAt: Number,
    updatedAt: Number,
    content: String,
    rating: Number,
    title: String,
    course: { type: Schema.Types.ObjectId, ref: 'Course' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
});

/**
 * Define Model
 */
const CourseReview = mongoose.model<ICourseReview>(
    'CourseReview',
    courseReviewSchema
);

// Export default Model
export default CourseReview;
