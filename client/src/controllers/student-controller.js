/**
 * Author: Nam Dinh
 * Created At: Sun Apr 24 2022
 * File name: user-controller.js
 */

import studentService from '@services/student-service';
import { ToastMessageType } from '@components';
import controllers from '@controllers/controller-factory';
import _ from 'lodash';
import utils from './utils';

class StudentController {
    async getUserCourse(setCourses) {
        const result = await studentService.getUserCourse();

        if (!result.error) {
            setCourses(result.courses);
        }

        return result;
    }

    async getFavoriteCourse(setCourses) {
        const result = await studentService.getFavoriteCourse();

        if (!result.error) {
            setCourses(result.courses);
        }

        return result;
    }

    async addFavoriteCourse(courseId, setToastMessageOpen) {
        const result = await studentService.addFavoriteCourse(
            courseId
        );

        if (result.success && result.success > 0) {
            setToastMessageOpen({
                isVisible: true,
                type: ToastMessageType.SUCCESS,
                msg: {
                    title: 'Thành công',
                    desc: 'Bạn đã thêm khóa học vào danh sách yêu thích',
                    duration: 3000,
                },
            });
        } else {
            const open = {
                isVisible: true,
                type: ToastMessageType.ERROR,
                msg: {
                    title: 'Thất bại',
                    desc: 'Bạn đã thêm khóa học vào danh sách yêu thích TRƯỚC ĐÓ',
                    duration: 3000,
                },
            };
            if (result.error) {
                open.msg.desc = result.error;
            }

            setToastMessageOpen(open);
        }

        return result;
    }

    async deleteFavoriteCourse(courseId, setCourse) {
        const result = await studentService.deleteFavoriteCourse(
            courseId
        );

        if (result.success) {
            setCourse((courses) =>
                _.filter(courses, (course) => course._id !== courseId)
            );
        }
    }

    async getSavedCourse(setCourses) {
        const result = await studentService.getSavedCourse();

        if (!result.error) {
            setCourses(result.courses);
        }

        return result;
    }

    async addSavedCourse(courseId, setToastMessageOpen) {
        const result = await studentService.addSavedCourse(courseId);

        if (result.success > 0) {
            setToastMessageOpen({
                isVisible: true,
                type: ToastMessageType.SUCCESS,
                msg: {
                    title: 'Thành công',
                    desc: 'Bạn đã thêm khóa học vào danh sách xem sau',
                    duration: 3000,
                },
            });
        }

        return result;
    }

    async deleteSavedCourse(courseId, setCourse) {
        const result = await studentService.deleteSavedCourse(
            courseId
        );

        if (result.success) {
            setCourse((courses) =>
                _.filter(courses, (course) => course._id !== courseId)
            );
        }

        return result;
    }

    async addNote(
        courseId,
        currentLessonId,
        time,
        newNote,
        setToastMessageOpen
    ) {
        const result = await studentService.addNote(
            courseId,
            currentLessonId,
            time,
            newNote
        );

        if (result.success) {
            setToastMessageOpen({
                isVisible: true,
                type: ToastMessageType.SUCCESS,
                msg: {
                    title: 'Thành công',
                    desc: 'Thêm ghi chú thành công',
                    duration: 3000,
                },
            });
        } else {
            setToastMessageOpen({
                isVisible: true,
                type: ToastMessageType.ERROR,
                msg: {
                    title: 'Thất bại',
                    desc: result.error,
                    duration: 3000,
                },
            });
        }
    }

    async getCourseNotes(courseId, setNotes) {
        const result = await studentService.getAllNotes({ courseId });

        if (!result.error) {
            const notes = result.notes
                .map((note) => {
                    note.time = utils.convertSecondToViewedString(
                        note.time
                    );

                    return note;
                })
                .sort(
                    (first, second) =>
                        first.lesson.position - second.lesson.position
                );

            setNotes(notes);
        }
    }

    async getLessonNotes(lessonId, setNotes) {
        const result = await studentService.getAllNotes({ lessonId });

        if (!result.error) {
            const notes = result.notes.map((note) => {
                note.time = utils.convertSecondToViewedString(
                    note.time
                );

                return note;
            });
            setNotes(notes);
        }
    }

    async updateNote(noteId, newContent, setNotes) {
        const result = await studentService.updateNote(
            noteId,
            newContent
        );

        if (result.success && result.success > 0) {
            setNotes((notes) => {
                const newNotes = notes.map((note) => {
                    if (note._id === noteId) {
                        note.content = newContent;
                    }
                    return { ...note };
                });

                return newNotes;
            });
        }
    }

    async deleteNote(noteId, setNotes) {
        const result = await studentService.deleteNote(noteId);

        if (result.success && result.success > 0) {
            setNotes((notes) => {
                const newNotes = notes.filter(
                    (note) => note._id != noteId
                );

                return newNotes;
            });
        }
    }

    async addComment(
        lessonId,
        ask,
        setComments,
        parentId,
        selectedCommentPage
    ) {
        const result = await studentService.addComment(
            lessonId,
            ask,
            parentId
        );

        if (result.success) {
            if (parentId) {
                await controllers.course.getAllComments(
                    lessonId,
                    selectedCommentPage,
                    setComments
                );
            } else {
                setComments((comments) => [
                    result.comment,
                    ...comments,
                ]);
            }
        }
    }
}

export default StudentController;
