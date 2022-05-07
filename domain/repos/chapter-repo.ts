/**
 * Author: Nam Dinh
 * Created At: Fri Apr 15 2022
 * File name: chapter-repo.ts
 */

import { IChapter } from '@model-types';

export interface IChapterRepo {
    getAll(options?: any): Promise<IChapter[]>;
    getById(id: string): Promise<IChapter | null>;
    addOne(chapter: IChapter): Promise<IChapter>;
    addMany(chapters: IChapter[]): Promise<IChapter[]>;
    updateOne(chapter: IChapter): Promise<number>;
    deleteOne(id: string): Promise<number>;
}
