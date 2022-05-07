/**
 * Author: Nam Dinh
 * Created At: Sun Apr 24 2022
 * File name: user-controller.js
 */

import userService from '@services/user-service';
import _ from 'lodash';

class UserController {
    #onSignInSuccess = (
        result,
        setWrapperUser,
        navigate,
        redirect
    ) => {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result));
        setWrapperUser(result);
        if (redirect) {
            navigate(redirect);
        } else {
            navigate('/');
        }
    };

    async signIn(
        user,
        setUser,
        setWrapperUser,
        navigate,
        redirect,
        setError
    ) {
        const checkUser = this.#isValidUser(user, setUser);

        if (!checkUser.isValid) {
            setUser(checkUser.user);
        } else {
            const userToSign = _.mapValues(user, 'value');
            const result = await userService.signIn(
                userToSign.username,
                userToSign.password
            );

            if (!result.error) {
                this.#onSignInSuccess(
                    result,
                    setWrapperUser,
                    navigate,
                    redirect
                );
            } else {
                setError(result.error);
            }
        }

        return false;
    }

    #isValidUser(user, setUser) {
        const required = [
            'firstName',
            'lastName',
            'username',
            'password',
        ];
        const requiredError = [
            'Tên không được để trống',
            'Họ không được để trống',
            'Tên đăng nhập không được để trống',
            'Mật khẩu không được để trống',
        ];

        let isValid = true;

        for (let i = 0; i < required.length; i++) {
            if (user[required[i]] && !user[required[i]].value) {
                user[required[i]].error = requiredError[i];
                isValid = false;
            }
        }

        setUser(user);

        return {
            isValid,
            user: {
                ...user,
            },
        };
    }

    async signUp(user, setUser, setWrapperUser, setError, navigate) {
        const checkUser = this.#isValidUser(user, setUser);

        if (!checkUser.isValid) {
            setUser(checkUser.user);
        } else {
            const newUser = _.mapValues(user, 'value');
            newUser.dob = newUser.dob.getTime();
            const result = await userService.signUp(newUser);

            if (result.error) {
                setError(result.error);
            } else {
                this.#onSignInSuccess(
                    result,
                    setWrapperUser,
                    navigate
                );
            }
        }
    }

    signOut(setUser) {
        userService.signOut();

        localStorage.removeItem('token');
        localStorage.removeItem('user');

        setUser({ token: null });
    }

    getCurrentUser() {
        var userStr = localStorage.getItem('user');

        if (userStr) {
            return JSON.parse(userStr);
        }

        return { token: null };
    }

    async getCurrentUserInfo(setUser) {
        const result = await userService.getCurrentUserInfo();

        if (!result.error) {
            setUser(result.user);
        }

        return result;
    }
}

export default UserController;
