/**
 * Author: Nam Dinh
 * Created At: Fri Apr 15 2022
 * File name: chapter-repo.ts
 */

import { ObjectId } from 'mongodb';
import { HydratedDocument } from 'mongoose';
import { IChapter } from '@model-types';
import { IChapterRepo } from '@irepos';

import Chapter from '@models/chapter-model';

class ChapterRepo implements IChapterRepo {
    async getAll(options: any): Promise<IChapter[]> {
        const query = Chapter.find(options);

        if (options.limit) {
            query.limit(options.limit);
        }

        if (options.skip) {
            query.skip(options.skip);
        }

        const result = await query.lean();

        return result;
    }

    async getById(id: String): Promise<IChapter | null> {
        const result = await Chapter.findById(id);

        return result;
    }

    async addOne(chapter: IChapter): Promise<IChapter> {
        chapter.createdAt = new Date().getTime();
        chapter.updatedAt = new Date().getTime();
        const newChapter: HydratedDocument<IChapter> = chapter;
        const result = await Chapter.create(newChapter);

        return result;
    }

    async addMany(chapters: IChapter[]): Promise<IChapter[]> {
        const newChapters = chapters.map((chapter) => {
            chapter.updatedAt = new Date().getTime();

            return chapter;
        });
        const result = await Chapter.insertMany(newChapters);

        return result;
    }

    async updateOne(chapter: IChapter): Promise<number> {
        const result = await Chapter.updateOne(
            {
                _id: chapter._id,
            },
            chapter
        );
        return result;
    }

    async deleteOne(id: string): Promise<number> {
        throw new Error('Method not implemented.');
    }
}

export default ChapterRepo;
