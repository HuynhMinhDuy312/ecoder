/**
 * Author: Nam Dinh
 * Created At: Thu May 05 2022
 * File name: course-comment-model.ts
 */

import mongoose, { HydratedDocument } from 'mongoose';

import { ICourseComment } from '@model-types';

/**
 * Define Schema
 */
const courseCommentSchema = new mongoose.Schema<ICourseComment>({
    createdAt: Number,
    content: String,
    courseComment:  { type: mongoose.Schema.Types.ObjectId, ref: 'CourseComment' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
    children: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CourseComment',
        },
    ],
});

const autoPopulate = function (
    this: HydratedDocument<ICourseComment>,
    next: any
) {
    this.populate('user', 'displayName');
    this.populate('children');

    next();
};

courseCommentSchema
    .pre('find', autoPopulate)
    .pre('findOne', autoPopulate);

/**
 * Define Model
 */
const CourseComment = mongoose.model<ICourseComment>(
    'CourseComment',
    courseCommentSchema
);
// Export default Model
export default CourseComment;
