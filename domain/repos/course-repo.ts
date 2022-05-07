/**
 * Author: Nam Dinh
 * Created At: Wed Apr 13 2022
 * File name: course-repo.ts
 */

import { ICourse } from '@model-types';

export interface ICourseRepo {
    getAll(options?: any, sort?: any): Promise<ICourse[]>;
    count(options?: any): Promise<number>;
    get(options: any, select?: string): Promise<ICourse | null>;
    getById(id: string): Promise<ICourse | null>;
    addOne(course: ICourse): Promise<ICourse>;
    updateOne(course: ICourse): Promise<number>;
    deleteOne(id: string): Promise<number>;
}
