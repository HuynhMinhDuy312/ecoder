/**
 * Author: Nam Dinh
 * Created At: Sun Apr 17 2022
 * File name: student-course-repo.ts
 */

import { IStudentCourse } from '@model-types';

export interface IStudentCourseRepo {
    getAll(options: any): Promise<IStudentCourse[]>;
    get(options: any): Promise<IStudentCourse | null>;
    persist(options: any): Promise<boolean>;
    addOne(userVar: IStudentCourse): Promise<IStudentCourse>;
    updateOne(studentCourse: IStudentCourse): Promise<number>;
}

export default IStudentCourseRepo;
