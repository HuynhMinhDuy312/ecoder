/**
 * Author: Nam Dinh
 * Created At: Sat Apr 16 2022
 * File name: course-service.js
 */

import axios, { authAxios } from './axios';

class CourseService {
    get = async (slug) => {
        const response = await axios.get(`/courses/${slug}`);
        const result = response.data;

        return result;
    };

    getPopularCourse = async () => {
        const response = await axios.get(`/courses?popular`);
        const result = response.data;

        return result;
    };

    persist = async (courseSlug) => {
        const response = await authAxios(
            localStorage.getItem('token')
        ).get(`/courses/persist?slug=${courseSlug}`);

        const result = response.data;

        return result;
    };

    register = async (courseId) => {
        const response = await authAxios(
            localStorage.getItem('token')
        ).get(`/courses/register?id=${courseId}`);

        const result = response.data;
        return result;
    };

    fetchReviews = async (courseId) => {
        const response = await axios.get(
            `/courses/reviews?id=${courseId}`
        );
        const result = response.data;

        return result;
    };

    submitReview = async (courseId, review) => {
        const response = await authAxios(
            localStorage.getItem('token')
        ).post(`/courses/reviews?id=${courseId}`, review);

        const result = response.data;

        return result;
    };

    getStudentCourse = async (slug) => {
        const response = await authAxios(
            localStorage.getItem('token')
        ).get(`/courses/student/${slug}`);
        const result = response.data;

        return result;
    };

    #reviewPerPage = 5;
    getTotalReviews = async (courseId) => {
        const response = await axios.get(
            `/courses/reviews/pages?courseId=${courseId}&perPage=${
                this.#reviewPerPage
            }`
        );
        const result = response.data;

        return result;
    };

    getReviews = async (courseId, page) => {
        if (courseId) {
            const response = await axios.get(
                `/courses/reviews?courseId=${courseId}&page=${page}&perPage=${
                    this.#reviewPerPage
                }`
            );
            const result = response.data;
            return result;
        }
    };

    completeLesson = async (slug) => {
        const response = await authAxios(
            localStorage.getItem('token')
        ).post(`/courses/student/${slug}`);
        const result = response.data;

        return result;
    };

    #coursePerPage = 4;
    getTotalPage = async (query) => {
        const response = await axios.get(
            `/courses/all/pages${query}&perPage=${
                this.#coursePerPage
            }`
        );
        const result = response.data;

        return result;
    };

    getAll = async (selectedPage, query) => {
        const response = await axios.get(
            `/courses/all${
                query || '?'
            }&page=${selectedPage}&perPage=${this.#coursePerPage}`
        );
        const result = response.data;

        return result;
    };

    #commentPerPage = 8;
    getAllComments = async (lessonId, page) => {
        const response = await axios.get(
            `/courses/comments?lessonId=${lessonId}&page=${page}&perPage=${
                this.#commentPerPage
            }`
        );
        const result = response.data;

        return result;
    };

    getCommentPages = async (lessonId) => {
        const response = await axios.get(
            `/courses/comments/pages?lessonId=${lessonId}&perPage=${
                this.#commentPerPage
            }`
        );
        const result = response.data;

        return result;
    };
}

export default new CourseService();
