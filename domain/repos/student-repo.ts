/**
 * Author: Nam Dinh
 * Created At: Tue Apr 12 2022
 * File name: student-repo.ts
 */

import { IStudent } from '@model-types';

export interface IStudentRepo {
    getAll(): Promise<IStudent[]>;
    getById(
        id: string,
        select?: string,
        isPopulated?: boolean
    ): Promise<IStudent | null>;
    add(iStudent: IStudent): Promise<IStudent>;
    updateOne(student: IStudent): Promise<number>;
    delete(id: string): Promise<number>;
}
