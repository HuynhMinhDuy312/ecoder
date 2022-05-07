/**
 * Author: Nam Dinh
 * Created At: Tue Apr 12 2022
 * File name: student-controller.ts
 */

import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import { awaitHandler } from './utils/await-handler';
import studentService from '@services/student-service';

const { CREATED, OK } = StatusCodes;

/**
 * Controller for student
 */
class StudentController {
    show = async (_: Request, res: Response) => {
        return awaitHandler(res, async () => {
            const students = await studentService.getAll();
            return res.status(OK).json(students);
        });
    };

    create = async (req: Request, res: Response) => {
        const data = req.body;

        try {
            const student = await studentService.add(data);
            return res.status(CREATED).json(student);
        } catch (err) {
            return res.status(err.HttpStatus).json(err.msg);
        }
    };

    course = async (req: Request, res: Response) => {
        const result = await awaitHandler(res, async () => {
            const user = req.user as any;
            const userResult = await studentService.getStudentCourse(
                user._id
            );

            return res.status(OK).json(userResult);
        });

        return result;
    };

    favoriteCourse = async (req: Request, res: Response) => {
        const result = await awaitHandler(res, async () => {
            const user = req.user as any;
            const userResult = await studentService.getFavoriteCourse(
                user._id
            );

            return res.status(OK).json(userResult);
        });

        return result;
    };

    postFavoriteCourse = async (req: Request, res: Response) => {
        const data = req.body;

        const result = await awaitHandler(res, async () => {
            const user = req.user as any;
            const userResult = await studentService.addFavoriteCourse(
                user._id,
                data.courseId as string
            );

            return res.status(OK).json(userResult);
        });

        return result;
    };

    deleteFavoriteCourse = async (req: Request, res: Response) => {
        const data = req.body;

        const result = await awaitHandler(res, async () => {
            const user = req.user as any;

            const userResult =
                await studentService.deleteFavoriteCourse(
                    user._id,
                    data.courseId as string
                );

            return res.status(OK).json(userResult);
        });

        return result;
    };

    savedCourse = async (req: Request, res: Response) => {
        const result = await awaitHandler(res, async () => {
            const user = req.user as any;
            const userResult = await studentService.getSavedCourse(
                user._id
            );

            return res.status(OK).json(userResult);
        });

        return result;
    };

    postSavedCourse = async (req: Request, res: Response) => {
        const data = req.body;

        const result = await awaitHandler(res, async () => {
            const user = req.user as any;
            const userResult = await studentService.addSavedCourse(
                user._id,
                data.courseId as string
            );

            return res.status(OK).json(userResult);
        });

        return result;
    };

    deleteSavedCourse = async (req: Request, res: Response) => {
        const data = req.body;

        const result = await awaitHandler(res, async () => {
            const user = req.user as any;

            const userResult = await studentService.deleteSavedCourse(
                user._id,
                data.courseId as string
            );

            return res.status(OK).json(userResult);
        });

        return result;
    };

    getNote = async (req: Request, res: Response) => {
        const { courseId, lessonId } = req.query;

        const result = await await awaitHandler(res, async () => {
            const user = req.user as any;
            const noteResult = await studentService.getAllNotes(
                user._id,
                courseId as string,
                lessonId as string
            );

            return res.status(OK).json(noteResult);
        });

        return result;
    };

    postNote = async (req: Request, res: Response) => {
        const data = req.body;

        const result = await awaitHandler(res, async () => {
            const user = req.user as any;

            const userResult = await studentService.addNote(
                user._id,
                parseInt(data.time),
                data.courseId as string,
                data.lessonId as string,
                data.note as string
            );

            return res.status(OK).json(userResult);
        });

        return result;
    };

    putNote = async (req: Request, res: Response) => {
        const data = req.body;

        const result = await awaitHandler(res, async () => {
            const user = req.user as any;

            const userResult = await studentService.updateNote(
                user._id,
                data.noteId as string,
                data.content as string
            );

            return res.status(OK).json(userResult);
        });

        return result;
    };

    deleteNote = async (req: Request, res: Response) => {
        const data = req.body;

        const result = await awaitHandler(res, async () => {
            const user = req.user as any;

            const userResult = await studentService.deleteNote(
                user._id,
                data.noteId as string
            );

            return res.status(OK).json(userResult);
        });

        return result;
    };
}

export default new StudentController();
