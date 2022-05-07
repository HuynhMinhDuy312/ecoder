/**
 * Author: Nam Dinh
 * Created At: Fri Apr 15 2022
 * File name: lesson-model.ts
 */

import mongoose from 'mongoose';

import { ILesson } from '@model-types';

/**
 * Define Schema
 */
const lessonSchema = new mongoose.Schema<ILesson>({
    createdAt: Number,
    updatedAt: Number,
    name: String,
    content: String,
    media: String, //video, text
    totalTime: Number, //in seconds
    position: Number,
    chapterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chapter',
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    },
});

/**
 * Define Model
 */
const Lesson = mongoose.model<ILesson>('Lesson', lessonSchema);

// Export default Model
export default Lesson;
