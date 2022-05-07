/**
 * Author: Nam Dinh
 * Created At: Thu Apr 14 2022
 * File name: course-level-service.ts
 */

import { ICourseLevel } from '@model-types';
import CourseLevel from '@models/course-level-model';
import unitOfWork from '@repos/unit-of-work';

class CourseLevelService {
    getAll = async (): Promise<ICourseLevel[]> => {
        return await unitOfWork.courseLevelRepo.getAll();
    };

    getById = async (id: string): Promise<ICourseLevel | null> => {
        throw new Error('Method not implemented.');
    };

    addOne = async (objCourseLevel: any): Promise<ICourseLevel> => {
        throw new Error('Method not implemented.');
    };

    addMany = async (
        objCourseLevels: any[]
    ): Promise<ICourseLevel[]> => {
        const courseLevels = objCourseLevels.map(
            (objCourseLevel) =>
                new CourseLevel(objCourseLevel) as ICourseLevel
        );

        return await unitOfWork.courseLevelRepo.addMany(courseLevels);
    };

    updateOne = async (objCourseLevel: any): Promise<number> => {
        throw new Error('Method not implemented.');
    };

    deleteOne = async (id: string): Promise<number> => {
        throw new Error('Method not implemented.');
    };
}

export default new CourseLevelService();
