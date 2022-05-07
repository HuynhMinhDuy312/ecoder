/**
 * Author: Nam Dinh
 * Created At: Sun Apr 24 2022
 * File name: SignIn.js
 */
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    faFacebookSquare,
    faGoogle,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { FormError, Input } from '@components';
import './SignIn.scss';

import controllers from '@controllers/controller-factory';

function SignIn({ setWrapperUser }) {
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = React.useState({
        username: {
            value: '',
            error: '',
        },
        password: {
            value: '',
            error: '',
        },
    });
    const [error, setError] = React.useState('');

    const setUserProperty = (property, value, error = '') => {
        setUser({
            ...user,
            [property]: {
                value,
                error,
            },
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let params = new URLSearchParams(location.search);

        controllers.user.signIn(
            user,
            setUser,
            setWrapperUser,
            navigate,
            params.get('redirect'),
            setError
        );
    };

    return (
        <form className="signin" onSubmit={handleSubmit}>
            <div className="signin__heading">Đăng nhập</div>
            {error && <FormError error={error} />}
            <Input
                placeholder="Nhập tài khoản"
                value={user.username.value}
                onChange={(e) =>
                    setUserProperty('username', e.target.value)
                }
                error={user.username.error}
            />
            <Input
                type="password"
                id="signin__password"
                placeholder="Nhập mật khẩu"
                value={user.password.value}
                onChange={(e) =>
                    setUserProperty('password', e.target.value)
                }
                error={user.password.error}
            />
            <input
                type="submit"
                className="signin__button"
                value="ĐĂNG NHẬP"
            />
            <div className="signin__socials">
                <button className="signin__socials-btn">
                    <FontAwesomeIcon
                        icon={faFacebookSquare}
                        className="signin__socials-fb"
                    />
                    Đăng nhập với facebook
                </button>
                <button className="signin__socials-btn">
                    <FontAwesomeIcon
                        icon={faGoogle}
                        className="signin__socials-gg"
                    />
                    Đăng nhập với google
                </button>
            </div>
            <span className="signin__misc">
                <label
                    htmlFor="authen__signin"
                    className="signin__signup"
                >
                    Đăng ký
                </label>
                <span className="signin__line">|</span>
                <span className="signin__forgot">Quên mật khẩu?</span>
            </span>
        </form>
    );
}

export default SignIn;
