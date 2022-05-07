/**
 * Author: Nam Dinh
 * Created At: Sun Apr 24 2022
 * File name: SignUp.js
 */
import React from 'react';
import {
    faFacebookSquare,
    faGoogle,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DatePicker, Input, FormError } from '@components';
import './SignUp.scss';

import controllers from '@controllers/controller-factory';
import { useNavigate } from 'react-router-dom';
import { useTransition } from 'react';

function SignUp({ setWrapperUser }) {
    const navigate = useNavigate();

    const [user, setUser] = React.useState({
        firstName: {
            value: '',
            error: '',
        },
        lastName: {
            value: '',
            error: '',
        },
        username: {
            value: '',
            error: '',
        },
        password: {
            value: '',
            error: '',
        },
        email: {
            value: '',
            error: '',
        },
        dob: {
            value: new Date(),
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

        controllers.user.signUp(
            user,
            setUser,
            setWrapperUser,
            setError,
            navigate
        );
    };

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <div className="signup__heading">Đăng ký</div>
            {error && <FormError error={error} />}
            <div className="signup__fullname">
                <Input
                    id="signup__lastname"
                    placeholder="Họ"
                    value={user.lastName.value}
                    onChange={(e) =>
                        setUserProperty('lastName', e.target.value)
                    }
                    error={user.lastName.error}
                />
                <Input
                    wrapperStyle={{ marginLeft: '24px' }}
                    id="signup__firstname"
                    placeholder="Tên"
                    value={user.firstName.value}
                    onChange={(e) =>
                        setUserProperty('firstName', e.target.value)
                    }
                    error={user.firstName.error}
                />
            </div>
            <Input
                className="signup__input"
                id="signup__username"
                placeholder="Nhập tài khoản"
                value={user.username.value}
                onChange={(e) =>
                    setUserProperty('username', e.target.value)
                }
                error={user.username.error}
            />
            <Input
                type="password"
                id="signup__password"
                placeholder="Nhập password"
                value={user.password.value}
                onChange={(e) =>
                    setUserProperty('password', e.target.value)
                }
                error={user.password.error}
            />
            <Input
                id="signup__email"
                placeholder="Nhập email"
                value={user.email.value}
                onChange={(e) =>
                    setUserProperty('email', e.target.value)
                }
                error={user.email.error}
            />
            <DatePicker
                selected={user.dob.value}
                onChange={(date) => setUserProperty('dob', date)}
                dateFormat="dd/MM/yyyy"
                error={user.dob.error}
            />
            <input
                type="submit"
                className="signup__button"
                value="ĐĂNG KÝ"
            />
            <div className="signin__socials">
                <button className="signin__socials-btn">
                    <FontAwesomeIcon
                        icon={faFacebookSquare}
                        className="signin__socials-fb"
                    />
                    Đăng ký với facebook
                </button>
                <button className="signin__socials-btn">
                    <FontAwesomeIcon
                        icon={faGoogle}
                        className="signin__socials-gg"
                    />
                    Đăng ký với google
                </button>
            </div>
            <span className="signup__misc">
                <label
                    htmlFor="authen__signup"
                    className="signup__signup"
                >
                    Đăng nhập
                </label>
                <span className="signup__line">|</span>
                <span className="signup__forgot">Quên mật khẩu?</span>
            </span>
        </form>
    );
}

export default SignUp;
