/**
 * Author: Nam Dinh
 * Created At: Sun Apr 17 2022
 * File name: student-course-repo.ts
 */

import { ObjectId } from 'mongodb';
import { HydratedDocument } from 'mongoose';
import { IStudentCourse } from '@model-types';
import { IStudentCourseRepo } from '@irepos';

import StudentCourse from '@models/student-course-model';

class StudentCourseRepo implements IStudentCourseRepo {
    async getAll(options: any): Promise<IStudentCourse[]> {
        const studentCourses = await StudentCourse.find(
            options
        ).lean().populate('course', 'name introduction slug image');

        return studentCourses;
    }

    async get(options: any): Promise<IStudentCourse | null> {
        const studentCourse = await StudentCourse.findOne(
            options
        ).lean();

        return studentCourse;
    }

    async persist(options: any): Promise<boolean> {
        const result = await this.get(options);

        return !!result;
    }

    async addOne(
        studentCourse: IStudentCourse
    ): Promise<IStudentCourse> {
        const newStudentCourse: HydratedDocument<IStudentCourse> =
            studentCourse;
        const result = await StudentCourse.create(newStudentCourse);

        return result;
    }

    async updateOne(studentCourse: IStudentCourse): Promise<number> {
        const result = await StudentCourse.updateOne(
            { _id: studentCourse._id },
            studentCourse
        );

        return result;
    }
}

export default StudentCourseRepo;
