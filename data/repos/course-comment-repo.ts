/**
 * Author: Nam Dinh
 * Created At: Thu May 05 2022
 * File name: course-comment-repo.ts
 */

import { HydratedDocument } from 'mongoose';
import { ICourseComment } from '@model-types';
import { ICourseCommentRepo } from '@irepos';

import CourseComment from '@models/course-comment-model';

class CourseCommentRepo implements ICourseCommentRepo {
    async count(option: any): Promise<number> {
        const result = await CourseComment.countDocuments(option);

        return result;
    }

    async getAll(options: any): Promise<ICourseComment[]> {
        const query = CourseComment.find(options)
            .lean()
            .populate('user', 'displayName');

        if (options.limit) {
            query.limit(options.limit);
        }

        if (options.skip) {
            query.skip(options.skip);
        }

        const courseComments = await query.exec();

        return courseComments;
    }

    async getById(id: String): Promise<ICourseComment | null> {
        const courseComment = await CourseComment.findById(id);

        return courseComment;
    }

    async addOne(
        courseComment: ICourseComment
    ): Promise<ICourseComment> {
        const hydratedCourseComment: HydratedDocument<ICourseComment> =
            courseComment;

        const result = await CourseComment.create(
            hydratedCourseComment
        );

        return result;
    }

    async updateOne(courseComments: ICourseComment): Promise<number> {
        const result = await CourseComment.updateOne(
            {
                _id: courseComments._id,
            },
            courseComments
        );

        return result.modifiedCount;
    }

    async deleteOne(id: string): Promise<number> {
        const result = await CourseComment.deleteOne(id);

        return result.deletedCount;
    }
}

export default CourseCommentRepo;
