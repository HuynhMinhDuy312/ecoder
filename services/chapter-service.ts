/**
 * Author: Nam Dinh
 * Created At: Fri Apr 15 2022
 * File name: chapter-service.ts
 */

import { IChapter } from '@model-types';
import Chapter from '@models/chapter-model';
import unitOfWork from '@repos/unit-of-work';
import { ParamMissingError } from '@shared/errors';
import mongoose from 'mongoose';

class ChapterService {
    getByCourseId = async (
        courseId?: string
    ): Promise<IChapter[]> => {
        if (courseId) {
            const options = {
                courseId,
            };
            const chapters = unitOfWork.chapterRepo.getAll(options);

            return chapters;
        }
        throw new ParamMissingError();
    };

    getById = async (id: string): Promise<IChapter | null> => {
        const result = unitOfWork.chapterRepo.getById(id);

        return result;
    };

    addOne = async (objChapter: any): Promise<IChapter | null> => {
        const result = unitOfWork.runTransaction(async () => {
            const course = await unitOfWork.courseRepo.getById(
                objChapter.courseId.toString()
            );
            let newChapter = null;

            if (course) {
                let position = course.chapterQuantity + 1;

                const chapter = new Chapter({
                    ...objChapter,
                    position,
                });
                newChapter = await unitOfWork.chapterRepo.addOne(
                    chapter
                );

                course.chapterQuantity += 1;
                course.chapters.push(newChapter);
                const resultCourse =
                    await unitOfWork.courseRepo.updateOne(course);
            }

            return newChapter;
        });

        return result;
    };

    addMany = async (
        objChapters: any[],
        courseId: string
    ): Promise<IChapter[] | null> => {
        const result = unitOfWork.runTransaction(async () => {
            const course = await unitOfWork.courseRepo.getById(
                courseId
            );
            let newChapters = null;

            if (course) {
                let startIndex = course.chapterQuantity + 1;

                const chapters = objChapters.map(
                    (objChapter) =>
                        new Chapter({
                            ...objChapter,
                            courseId,
                            position: startIndex++,
                        })
                );
                newChapters = await unitOfWork.chapterRepo.addMany(
                    chapters
                );

                const _ids = newChapters.map(
                    (newChapter) => newChapter._id
                );
                course.chapters = (
                    course.chapters as typeof _ids
                ).concat(_ids);
                course.chapterQuantity += newChapters.length;
                const resultCourse =
                    await unitOfWork.courseRepo.updateOne(course);
            }

            return newChapters;
        });

        return result;
    };

    updateOne = async (objChapter: any): Promise<number> => {
        throw new Error('Method not implemented.');
    };

    deleteOne = async (id: string): Promise<number> => {
        throw new Error('Method not implemented.');
    };
}

export default new ChapterService();
