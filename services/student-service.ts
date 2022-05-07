/**
 * Author: Nam Dinh
 * Created At: Tue Apr 12 2022
 * File name: student-service.ts
 */

import logger from 'jet-logger';

import { ILessonNote, IStudent } from '@model-types';
import LessonNote from '@models/lesson-note-model';
import unitOfWork from '@repos/unit-of-work';
import { ParamMissingError, ServerError } from '@shared/errors';
import _ from 'lodash';

class StudentService {
    getAll = async (): Promise<IStudent[]> => {
        return await unitOfWork.studentRepo.getAll();
    };

    getById = async (id: string): Promise<IStudent | null> => {
        return await unitOfWork.studentRepo.getById(id);
    };

    add = async (student: any) => {
        try {
            await unitOfWork.runTransaction(async () => {
                try {
                    const user = await unitOfWork.userRepo.add(
                        student
                    );
                    await unitOfWork.studentRepo.add({
                        ...student,
                        _id: user._id,
                    });
                } catch (err) {
                    logger.err(err);
                    throw new ServerError();
                }
            });
        } catch (err) {
            logger.err(err);
            throw new ServerError();
        }
    };

    getStudentCourse = async (id: string): Promise<any> => {
        if (!id) return { error: 'Người dùng không tồn tại' };

        const courses = await unitOfWork.studentCourseRepo.getAll({
            student: id,
        });

        return { courses };
    };

    addFavoriteCourse = async (
        id: string,
        courseId: string
    ): Promise<any> => {
        if (!id) return { error: 'Người dùng không tồn tại' };

        const student = await unitOfWork.studentRepo.getById(
            id,
            'favoriteCourses'
        );

        if (!student) return { error: 'Sinh viên không tồn tại' };

        const course = await unitOfWork.courseRepo.getById(courseId);

        if (!course) return { error: 'Khóa học không tồn tại' };

        let success = 0;

        const persist = _.find(
            student.favoriteCourses,
            (course) => course == courseId
        );

        if (!persist) {
            student.favoriteCourses = [
                ...student.favoriteCourses,
                courseId,
            ];

            success = await unitOfWork.studentRepo.updateOne(student);
        }

        return { success };
    };

    deleteFavoriteCourse = async (
        userId: string,
        courseId: string
    ) => {
        if (!userId) return { error: 'Unauthenticated' };

        const student = await unitOfWork.studentRepo.getById(
            userId,
            'favoriteCourses'
        );

        if (!student) return { error: 'Sinh viên không tồn tại' };

        student.favoriteCourses = student.favoriteCourses.filter(
            (id) => id != courseId
        );

        const successCount = await unitOfWork.studentRepo.updateOne(
            student
        );

        return { success: successCount > 0 };
    };

    getFavoriteCourse = async (id: string): Promise<any> => {
        if (!id) return { error: 'Người dùng không tồn tại' };

        const user = await unitOfWork.studentRepo.getById(
            id,
            'favoriteCourses',
            true
        );

        if (!user) return { error: 'Sinh viên không tồn tại' };

        return { courses: user.favoriteCourses };
    };

    addSavedCourse = async (
        id: string,
        courseId?: string
    ): Promise<any> => {
        if (!id) return { error: 'Người dùng không tồn tại' };

        if (!courseId) {
            throw new ParamMissingError();
        }

        const student = await unitOfWork.studentRepo.getById(
            id,
            'savedCourses'
        );

        if (!student) return { error: 'Sinh viên không tồn tại' };

        const course = await unitOfWork.courseRepo.getById(courseId);

        if (!course) return { error: 'Khóa học không tồn tại' };

        let success = 0;

        const persist = _.find(
            student.savedCourses,
            (course) => course == courseId
        );

        if (!persist) {
            student.savedCourses = [
                ...student.savedCourses,
                courseId,
            ];

            success = await unitOfWork.studentRepo.updateOne(student);
        }

        return { success };
    };

    deleteSavedCourse = async (userId: string, courseId: string) => {
        if (!userId) return { error: 'Unauthenticated' };

        const student = await unitOfWork.studentRepo.getById(
            userId,
            'savedCourses'
        );

        if (!student) return { error: 'Sinh viên không tồn tại' };

        student.savedCourses = student.savedCourses.filter(
            (id) => id != courseId
        );

        const successCount = await unitOfWork.studentRepo.updateOne(
            student
        );

        return { success: successCount > 0 };
    };

    getSavedCourse = async (id: string): Promise<any> => {
        if (!id) return { error: 'Người dùng không tồn tại' };

        const user = await unitOfWork.studentRepo.getById(
            id,
            'savedCourses',
            true
        );

        if (!user) return { error: 'Sinh viên không tồn tại' };

        return { courses: user.savedCourses };
    };

    addNote = async (
        userId: string,
        time: number,
        courseId: string,
        lessonId: string,
        note: string
    ): Promise<any> => {
        if (!userId) return { error: 'Unauthenticated' };

        const newLessonNote: ILessonNote = new LessonNote({
            user: userId,
            time,
            course: courseId,
            lesson: lessonId,
            content: note,
        });
        const newNote = await unitOfWork.lessonNoteRepo.addOne(
            newLessonNote
        );

        return { success: !!newNote };
    };

    getAllNotes = async (
        userId: string,
        courseId: string,
        lessonId: string
    ): Promise<any> => {
        if (!userId) return { error: 'Unauthenticated' };

        const options: any = {};

        if (courseId) {
            options.course = courseId;
        }

        if (lessonId) {
            options.lesson = lessonId;
        }

        const notes = await unitOfWork.lessonNoteRepo.getAll(options);

        return { notes };
    };

    updateNote = async (
        userId: string,
        noteId: string,
        newNote: string
    ): Promise<any> => {
        if (!userId) return { error: 'Unauthenticated' };

        const note = await unitOfWork.lessonNoteRepo.getById(noteId);

        if (!note) return { error: 'Ghi chú không tồn tại' };

        note.content = newNote;
        const count = await unitOfWork.lessonNoteRepo.updateOne(note);
        console.log(note);

        return { success: count };
    };

    deleteNote = async (
        userId: string,
        noteId: string
    ): Promise<any> => {
        if (!userId) return { error: 'Unauthenticated' };

        const count = await unitOfWork.lessonNoteRepo.deleteOne(
            noteId
        );

        return { success: count };
    };
}

export default new StudentService();
