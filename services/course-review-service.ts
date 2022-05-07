/**
 * Author: Nam Dinh
 * Created At: Sun Apr 17 2022
 * File name: course-review-service.ts
 */

import { ICourseReview } from '@model-types';
import CourseReview from '@models/course-review-model';
import unitOfWork from '@repos/unit-of-work';

class CourseReviewService {
    getByCourseId = async (
        courseId: string
    ): Promise<ICourseReview[]> => {
        const options = { courseId };

        return await unitOfWork.courseReviewRepo.getAll(options);
    };

    addOne = async (
        objCourseReview: any,
        currentUser: any
    ): Promise<ICourseReview> => {
        const newCourseReview = new CourseReview({
            ...objCourseReview,
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
            userId: currentUser._id,
        });

        const courseReview = await unitOfWork.courseReviewRepo.addOne(
            newCourseReview
        );

        return courseReview;
    };

    updateOne = async (objCourseReview: any): Promise<number> => {
        throw new Error('Method not implemented.');
    };

    deleteOne = async (id: string): Promise<number> => {
        throw new Error('Method not implemented.');
    };
}

export default new CourseReviewService();
