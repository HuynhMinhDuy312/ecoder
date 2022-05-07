/**
 * Author: Nam Dinh
 * Created At: Sat Apr 16 2022
 * File name: course-service.js
 */

import axios, { authAxios } from './axios';

class UserService {
    signIn = async (username, password) => {
        const response = await axios.post(`/auth/sign-in`, {
            username,
            password,
        });
        const result = response.data;

        return result;
    };

    signUp = async (user) => {
        const response = await axios.post(`/auth/sign-up`, user);
        const result = response.data;

        return result;
    };

    signOut = () => {
        authAxios(localStorage.getItem('token')).get(
            `/auth/sign-out`
        );
    };

    getCurrentUserInfo = async () => {
        const response = await authAxios(
            localStorage.getItem('token')
        ).get(`/users/info`);
        const result = response.data;

        return result;
    };
}

export default new UserService();
