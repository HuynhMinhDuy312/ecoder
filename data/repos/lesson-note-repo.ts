/**
 * Author: Nam Dinh
 * Created At: Thu May 05 2022
 * File name: lesson-note-repo.ts
 */

import { ObjectId } from 'mongodb';
import { HydratedDocument } from 'mongoose';
import { ILessonNote } from '@model-types';
import { ILessonNoteRepo } from '@irepos';

import LessonNote from '@models/lesson-note-model';

class LessonNoteRepo implements ILessonNoteRepo {
    async getAll(options: any): Promise<ILessonNote[]> {
        const query = LessonNote.find(options)
            .lean()
            .populate('lesson', 'name position');

        if (options.sort) {
            query.sort(options.sort);
        }

        const result = await query;

        return result;
    }

    async getById(id: string): Promise<ILessonNote | null> {
        const result = await LessonNote.findById(id).lean();

        return result;
    }

    async addOne(lessonNote: ILessonNote): Promise<ILessonNote> {
        const hyratedLessonNote: HydratedDocument<ILessonNote> =
            lessonNote;
        const result = await LessonNote.create(hyratedLessonNote);

        return result;
    }

    async updateOne(lessonNote: ILessonNote): Promise<number> {
        const result = await LessonNote.updateOne(
            { _id: lessonNote._id },
            lessonNote
        );

        return result.modifiedCount;
    }

    async deleteOne(id: string): Promise<number> {
        const result = await LessonNote.remove({ _id: id });

        return result.deletedCount;
    }
}

export default LessonNoteRepo;
