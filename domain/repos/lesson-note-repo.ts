/**
 * Author: Nam Dinh
 * Created At: Thu May 05 2022
 * File name: lesson-note-repo.ts
 */

import { ILessonNote } from '@model-types';

export interface ILessonNoteRepo {
    getAll(options?: any): Promise<ILessonNote[]>;
    getById(id: string): Promise<ILessonNote | null>;
    addOne(lessonNote: ILessonNote): Promise<ILessonNote>;
    updateOne(lessonNote: ILessonNote): Promise<number>;
    deleteOne(id: string): Promise<number>;
}
