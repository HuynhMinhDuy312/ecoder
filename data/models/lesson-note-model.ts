/******************************************
 *  Author : Nam Dinh
 *  Created On : Thu May 05 2022
 *  File : lesson-note-model.ts
 *******************************************/

import mongoose from 'mongoose';

import { ILessonNote } from '@model-types';

/**
 * Define Schema
 */
const lessonNoteSchema = new mongoose.Schema<ILessonNote>({
    content: String,
    time: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
});

/**
 * Define Model
 */
const Lesson = mongoose.model<ILessonNote>(
    'LessonNote',
    lessonNoteSchema
);

// Export default Model
export default Lesson;
