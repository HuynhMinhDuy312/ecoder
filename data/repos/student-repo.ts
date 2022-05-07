/**
 * Author: Nam Dinh
 * Created At: Tue Apr 12 2022
 * File name: student-repo.ts
 */

import mongoose, { HydratedDocument } from 'mongoose';
import { IStudent } from '@model-types';
import { IStudentRepo } from '@irepos';

import Student from '@models/student-model';

class StudentRepo implements IStudentRepo {
    getAll(): Promise<IStudent[]> {
        throw new Error('Method not implemented.');
    }

    async getById(
        id: string,
        select?: string,
        isPopulated?: boolean
    ): Promise<IStudent | null> {
        let query = Student.findById(id).lean();

        if (isPopulated) {
            query = Student.findById(id)
                .lean()
                .populate(
                    'favoriteCourses',
                    'name introduction slug image'
                )
                .populate(
                    'savedCourses',
                    'name introduction slug image'
                );
        }

        if (select) {
            query.select(select);
        }

        const student = await query;

        return student;
    }

    async add(iStudent: IStudent): Promise<IStudent> {
        const student: HydratedDocument<IStudent> = iStudent;

        return await Student.create(student);
    }

    async updateOne(student: IStudent): Promise<number> {
        const result = await Student.updateOne(
            { _id: student._id },
            student
        );

        return result.modifiedCount;
    }

    delete(id: string): Promise<number> {
        throw new Error('Method not implemented.');
    }
}

export default StudentRepo;
