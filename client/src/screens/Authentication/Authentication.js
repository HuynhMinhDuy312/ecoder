import React from 'react';
import {
    faFacebookSquare,
    faGoogle,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Authentication.scss';
import { SignIn, SignUp } from '@components';
import controllers from '@controllers/controller-factory';
import { Navigate, useOutletContext } from 'react-router-dom';

function Authentication({ setUser }) {
    const outletContext = useOutletContext();

    return controllers.user.getCurrentUser().token != null ? (
        <Navigate to="/" />
    ) : (
        <div className="authen">
            <div className="authen__container">
                <div className="authen__left">
                    <div className="authen__heading">
                        Tạo tài khoản
                    </div>
                    <label
                        htmlFor="authen__signin"
                        className="authen__btn"
                    >
                        Đăng ký
                    </label>
                </div>
                <input
                    type="radio"
                    hidden
                    name="authen__radio"
                    id="authen__signin"
                    className="authen__radio1"
                />
                <div className="authen__right">
                    <div className="authen__heading">
                        Bạn đã có tài khoản?
                    </div>
                    <label
                        htmlFor="authen__signup"
                        className="authen__btn"
                    >
                        Đăng nhập
                    </label>
                </div>
                <input
                    type="radio"
                    hidden
                    name="authen__radio"
                    id="authen__signup"
                    className="authen__radio2"
                    defaultChecked
                />
                <div className="authen__box">
                    <SignIn setWrapperUser={outletContext} />
                    <SignUp setWrapperUser={outletContext} />
                </div>
            </div>
        </div>
    );
}

export default Authentication;
