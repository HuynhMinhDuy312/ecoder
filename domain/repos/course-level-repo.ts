/**
 * Author: Nam Dinh
 * Created At: Wed Apr 13 2022
 * File name: level-repo.ts
 */

import { ICourseLevel } from '@model-types';

export interface ICourseLevelRepo {
    getAll(options?: any): Promise<ICourseLevel[]>;
    getById(id: string): Promise<ICourseLevel | null>;
    addOne(courseLevel: ICourseLevel): Promise<ICourseLevel>;
    addMany(courseLevels: ICourseLevel[]): Promise<ICourseLevel[]>;
    updateOne(courseLevel: ICourseLevel): Promise<number>;
    deleteOne(id: string): Promise<number>;
}
