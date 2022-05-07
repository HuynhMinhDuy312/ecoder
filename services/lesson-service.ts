/**
 * Author: Nam Dinh
 * Created At: Fri Apr 15 2022
 * File name: lesson-service.ts
 */

import { ObjectId } from 'mongodb';

import { ILesson } from '@model-types';
import unitOfWork from '@repos/unit-of-work';
import Lesson from '@models/lesson-model';
import { ParamMissingError } from '@shared/errors';

class LessonService {
    getAll = async (): Promise<ILesson[]> => {
        throw new Error('Method not implemented.');
    };

    getByCourseId = async (courseId?: string): Promise<ILesson[]> => {
        if (courseId) {
            const options = {
                courseId: new ObjectId(courseId),
            };

            return await unitOfWork.lessonRepo.getAll(options);
        }
        throw new ParamMissingError();
    };

    getById = async (id: string): Promise<ILesson | null> => {
        throw new Error('Method not implemented.');
    };

    addOne = async (objLesson: any): Promise<ILesson | null> => {
        const result = await unitOfWork.runTransaction(async () => {
            const course = await unitOfWork.courseRepo.getById(
                objLesson.courseId
            );
            let newLesson = null;

            if (course) {
                let position = course.lessonQuantity + 1;

                const lesson: ILesson = new Lesson({
                    ...objLesson,
                    position,
                });
                const newLesson = await unitOfWork.lessonRepo.addOne(
                    lesson
                );

                course.lessonQuantity += 1;
                course.totalTime += newLesson.totalTime;
                const resultCourse =
                    await unitOfWork.courseRepo.updateOne(course);

                const chapter = await unitOfWork.chapterRepo.getById(
                    objLesson.chapterId
                );

                if (chapter) {
                    // Update the number of lesson in chapter
                    chapter.lessonQuantity += 1;
                    chapter.totalTime += newLesson.totalTime;
                    chapter.lessons = [
                        ...chapter.lessons,
                        newLesson._id,
                    ];
                    const resultChapter =
                        await unitOfWork.chapterRepo.updateOne(
                            chapter
                        );

                    // Update the number of lesson in course
                }
            }

            return newLesson;
        });

        return result;
    };

    addMany = async (
        objLessons: any[],
        courseId: string,
        chapterId: string
    ): Promise<ILesson[] | null> => {
        const result = await unitOfWork.runTransaction(async () => {
            // Update the number of lessons in course
            const course = await unitOfWork.courseRepo.getById(
                courseId
            );
            let newLessons = null;

            if (course) {
                let startIndex = course.lessonQuantity + 1;
                // Create lessons
                const lessons = objLessons.map(
                    (objLesson) =>
                        new Lesson({
                            ...objLesson,
                            courseId,
                            chapterId,
                            position: startIndex++,
                        }) as ILesson
                );
                newLessons = await unitOfWork.lessonRepo.addMany(
                    lessons
                );
                const totalTime = newLessons.reduce(
                    (prev, currentValue, _) =>
                        prev + currentValue.totalTime,
                    0
                );
                course.lessonQuantity += newLessons.length;
                course.totalTime += totalTime;
                const resultCourse =
                    await unitOfWork.courseRepo.updateOne(course);

                const chapter = await unitOfWork.chapterRepo.getById(
                    chapterId
                );

                if (chapter) {
                    // Update the number of lessons in chapter
                    chapter.lessonQuantity += newLessons.length;
                    chapter.totalTime += totalTime;
                    chapter.lessons = [
                        ...chapter.lessons,
                        ...newLessons.map(
                            (newLesson) => newLesson._id
                        ),
                    ];
                    const resultChapter =
                        await unitOfWork.chapterRepo.updateOne(
                            chapter
                        );
                }
            }

            return newLessons;
        });

        return result;
    };

    updateOne = async (objLesson: any): Promise<number> => {
        throw new Error('Method not implemented.');
    };

    deleteOne = async (id: string): Promise<number> => {
        throw new Error('Method not implemented.');
    };
}

export default new LessonService();
