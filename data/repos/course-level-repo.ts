/**
 * Author: Nam Dinh
 * Created At: Wed Apr 13 2022
 * File name: course-level-repo.ts
 */

import { ObjectId } from 'mongodb';
import { HydratedDocument } from 'mongoose';
import { ICourseLevel } from '@model-types';
import { ICourseLevelRepo } from '@irepos';

import CourseLevel from '@models/course-level-model';

class CourseLevelRepo implements ICourseLevelRepo {
    async getAll(options: any): Promise<ICourseLevel[]> {
        return await CourseLevel.find(options);
    }

    async getById(id: string): Promise<ICourseLevel | null> {
        throw new Error('Method not implemented.');
    }

    async addOne(courseLevel: ICourseLevel): Promise<ICourseLevel> {
        throw new Error('Method not implemented.');
    }

    async addMany(
        courseLevels: ICourseLevel[]
    ): Promise<ICourseLevel[]> {
        return await CourseLevel.insertMany(courseLevels);
    }

    async updateOne(courseLevel: ICourseLevel): Promise<number> {
        throw new Error('Method not implemented.');
    }

    async deleteOne(id: string): Promise<number> {
        throw new Error('Method not implemented.');
    }
}

export default CourseLevelRepo;
