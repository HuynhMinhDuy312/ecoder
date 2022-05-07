/**
 * Author: Nam Dinh
 * Created At: Sun Apr 17 2022
 * File name: course-review-repo.ts
 */

import { ObjectId } from 'mongodb';
import { HydratedDocument } from 'mongoose';
import { ICourseReview } from '@model-types';
import { ICourseReviewRepo } from '@irepos';

import CourseReview from '@models/course-review-model';

class CourseReviewRepo implements ICourseReviewRepo {
    async getAll(options: any): Promise<ICourseReview[]> {
        const query = CourseReview.find(options).populate({
            path: 'user',
        });

        if (options.limit) {
            query.limit(options.limit);
        }

        if (options.skip) {
            query.skip(options.skip);
        }

        const courseReviews = await query;

        return courseReviews;
    }

    async countReviews(options: any): Promise<number> {
        const query = CourseReview.find(options);

        const count = await query.count();

        return count;
    }

    async addOne(
        courseReview: ICourseReview
    ): Promise<ICourseReview> {
        const newCourseReview: HydratedDocument<ICourseReview> =
            courseReview;
        const courseReviewResult = await CourseReview.create(
            newCourseReview
        );

        return courseReviewResult;
    }

    async updateOne(courseReviews: ICourseReview): Promise<number> {
        throw new Error('Method not implemented.');
    }

    async deleteOne(id: string): Promise<number> {
        throw new Error('Method not implemented.');
    }
}

export default CourseReviewRepo;
