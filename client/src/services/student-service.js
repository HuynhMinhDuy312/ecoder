/**
 * Author: Nam Dinh
 * Created At: Sat Apr 16 2022
 * File name: student-service.js
 */

import axios, { authAxios } from './axios';

class StudentService {
    async getUserCourse() {
        const response = await authAxios(
            localStorage.getItem('token')
        ).get(`/students/course`);
        const result = response.data;

        return result;
    }

    async getFavoriteCourse() {
        const response = await authAxios(
            localStorage.getItem('token')
        ).get(`/students/favorite-course`);
        const result = response.data;

        return result;
    }

    async addFavoriteCourse(courseId) {
        const response = await authAxios(
            localStorage.getItem('token')
        ).post(`/students/favorite-course`, { courseId });
        const result = response.data;

        return result;
    }

    async deleteFavoriteCourse(courseId) {
        const response = await authAxios(
            localStorage.getItem('token')
        ).post(`/students/favorite-course/delete`, {
            courseId,
        });
        const result = response.data;

        return result;
    }

    async getSavedCourse() {
        const response = await authAxios(
            localStorage.getItem('token')
        ).get(`/students/saved-course`);
        const result = response.data;

        return result;
    }

    async addSavedCourse(courseId) {
        const response = await authAxios(
            localStorage.getItem('token')
        ).post(`/students/saved-course`, { courseId });
        const result = response.data;

        return result;
    }

    async deleteSavedCourse(courseId) {
        const response = await authAxios(
            localStorage.getItem('token')
        ).post(`/students/saved-course/delete`, {
            courseId,
        });
        const result = response.data;

        return result;
    }

    async getAllNotes(options) {
        let query = '';

        if (options.courseId) {
            query += `courseId=${options.courseId}&`;
        }

        if (options.lessonId) {
            query += `lessonId=${options.lessonId}&`;
        }

        const response = await authAxios(
            localStorage.getItem('token')
        ).get(`/students/note?${query}`);
        const result = response.data;

        return result;
    }

    async addNote(courseId, currentLessonId, time, newNote) {
        const response = await authAxios(
            localStorage.getItem('token')
        ).post(`/students/note`, {
            courseId,
            lessonId: currentLessonId,
            note: newNote,
            time,
        });
        const result = response.data;

        return result;
    }

    async updateNote(noteId, newContent) {
        const response = await authAxios(
            localStorage.getItem('token')
        ).post(`/students/note/update`, {
            noteId: noteId,
            content: newContent,
        });
        const result = response.data;

        return result;
    }

    async deleteNote(noteId) {
        const response = await authAxios(
            localStorage.getItem('token')
        ).post(`/students/note/delete`, {
            noteId: noteId,
        });
        const result = response.data;

        return result;
    }

    addComment = async (lessonId, content, parentId) => {
        const response = await authAxios(
            localStorage.getItem('token')
        ).post(`/courses/comments`, { lessonId, content, parentId });
        const result = response.data;

        return result;
    };
}

export default new StudentService();
