/**
 * Author: Nam Dinh
 * Created At: Sun Apr 17 2022
 * File name: course-review-repo.ts
 */

import { ICourseReview } from '@model-types';

export interface ICourseReviewRepo {
    getAll(options?: any): Promise<ICourseReview[]>;
    countReviews(options?: any): Promise<number>;
    addOne(courseReview: ICourseReview): Promise<ICourseReview>;
    updateOne(courseReview: ICourseReview): Promise<number>;
    deleteOne(id: string): Promise<number>;
}
