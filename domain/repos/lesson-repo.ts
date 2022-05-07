/**
 * Author: Nam Dinh
 * Created At: Fri Apr 15 2022
 * File name: lesson-repo.ts
 */

import { ILesson } from '@model-types';

export interface ILessonRepo {
    getAll(options?: any): Promise<ILesson[]>;
    getById(id: string): Promise<ILesson | null>;
    get(options: any): Promise<ILesson | null>;
    addOne(lesson: ILesson): Promise<ILesson>;
    addMany(lessons: ILesson[]): Promise<ILesson[]>;
    updateOne(lesson: ILesson): Promise<number>;
    deleteOne(id: string): Promise<number>;
}
