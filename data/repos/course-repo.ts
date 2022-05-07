/**
 * Author: Nam Dinh
 * Created At: Wed Apr 13 2022
 * File name: course-repo.ts
 */

import { ObjectId } from 'mongodb';
import { HydratedDocument } from 'mongoose';
import { ICourse } from '@model-types';
import { ICourseRepo } from '@irepos';

import Course from '@models/course-model';

class CourseRepo implements ICourseRepo {
    async getAll(options?: any, sort?: any): Promise<ICourse[]> {
        let query = Course.find(options);

        if (options.sort) {
            query.sort(sort);
        }

        if (options.limit) {
            query.limit(options.limit);
        }

        if (options.skip) {
            query.skip(options.limit);
        }

        return await query.lean();
    }

    async count(options: any): Promise<number> {
        const result = await Course.countDocuments(options);

        return result;
    }

    async getById(id: string): Promise<ICourse | null> {
        const result = await Course.findById(id);

        return result;
    }

    async get(
        options: any,
        select?: string
    ): Promise<ICourse | null> {
        const lessonOptions: any = {
            path: 'lessons',
        };

        if (select) {
            lessonOptions.select = select;
        }

        
        const result = await Course.findOne(options)
            .lean()
            .populate({
                path: 'chapters',
                populate: lessonOptions,
            })
            .populate('language')
            .populate('level');

        return result;
    }

    async addOne(course: ICourse): Promise<ICourse> {
        course.createdAt = new Date().getTime();
        course.updatedAt = new Date().getTime();
        const newCourse: HydratedDocument<ICourse> = course;

        return await Course.create(newCourse);
    }

    async updateOne(course: ICourse): Promise<number> {
        course.updatedAt = new Date().getTime();
        const result = await Course.updateOne({ _id: course._id }, course);

        return result.modifiedCount;
    }

    async deleteOne(id: string): Promise<number> {
        return await Course.updateOne(
            { _id: new ObjectId(id) },
            { status: 'removed' }
        );
    }
}

export default CourseRepo;
