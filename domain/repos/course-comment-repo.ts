/**
 * Author: Nam Dinh
 * Created At: Thu May 05 2022
 * File name: course-comment-repo.ts
 */

import { ICourseComment } from '@model-types';

export interface ICourseCommentRepo {
    count(options?: any): Promise<number>;
    getAll(options?: any): Promise<ICourseComment[]>;
    getById(id: string): Promise<ICourseComment | null>;
    addOne(courseComment: ICourseComment): Promise<ICourseComment>;
    updateOne(courseComment: ICourseComment): Promise<number>;
    deleteOne(id: string): Promise<number>;
}
