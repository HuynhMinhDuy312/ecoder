/**
 * Author: Nam Dinh
 * Created At: Fri Apr 15 2022
 * File name: chapter-model.ts
 */

import mongoose from 'mongoose';

import { IChapter } from '@model-types';

/**
 * Define Schema
 */
const chapterSchema = new mongoose.Schema<IChapter>({
    createdAt: Number,
    updatedAt: Number,
    name: String,
    lessonQuantity: { type: Number, default: 0 },
    totalTime: { type: Number, default: 0 }, // in seconds
    position: Number,
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    lessons: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
    ],
});

/**
 * Define Model
 */
const Chapter = mongoose.model<IChapter>('Chapter', chapterSchema);

// Export default Model
export default Chapter;
