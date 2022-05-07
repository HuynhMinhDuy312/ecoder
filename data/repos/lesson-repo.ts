/**
 * Author: Nam Dinh
 * Created At: Fri Apr 15 2022
 * File name: lesson-repo.ts
 */

import { ILesson } from '@model-types';
import { ILessonRepo } from '@irepos';

import Lesson from '@models/lesson-model';
import { HydratedDocument } from 'mongoose';

class LessonRepo implements ILessonRepo {
    async getAll(options: any): Promise<ILesson[]> {
        const query = Lesson.find(options);

        if (options.limit) {
            query.limit(options.limit);
        }

        if (options.skip) {
            query.skip(options.limit);
        }

        const result = await query.lean();

        return result;
    }

    async get(options: any): Promise<ILesson | null> {
        const result = await Lesson.findOne(options);

        return result;
    }

    async getById(id: String): Promise<ILesson | null> {
        const result = await Lesson.findById(id);

        return result;
    }

    async addOne(lesson: ILesson): Promise<ILesson> {
        // Timestamp
        lesson.createdAt = new Date().getTime();
        lesson.updatedAt = new Date().getTime();
        const newLesson: HydratedDocument<ILesson> = lesson;
        const result = await Lesson.create(newLesson);

        return result;
    }

    async addMany(lessons: ILesson[]): Promise<ILesson[]> {
        const result = await Lesson.insertMany(
            lessons.map((lesson) => {
                lesson.updatedAt = new Date().getTime();

                return lesson;
            })
        );

        return result;
    }

    async updateOne(lessons: ILesson): Promise<number> {
        throw new Error('Method not implemented.');
    }

    async deleteOne(id: string): Promise<number> {
        throw new Error('Method not implemented.');
    }
}

export default LessonRepo;
