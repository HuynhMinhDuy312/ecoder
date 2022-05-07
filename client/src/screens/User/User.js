import React from 'react';
import {
    faUser,
    faSignature,
    faEnvelope,
    faCakeCandles,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserContext } from '@components/context';
import { UserCourse } from '@components';

import './User.scss';

import controllers from '@controllers/controller-factory';

function User() {
    const userContext = React.useContext(UserContext);
    const [user, setUser] = React.useState({});
    const [courses, setCourses] = React.useState([]);

    React.useEffect(() => {
        controllers.user.getCurrentUserInfo(setUser);
        controllers.student.getUserCourse(setCourses);
    }, []);

    return (
        <div className="user">
            <div className="user__profile">
                <img
                    src="https://static.fullstack.edu.vn/static/media/cover-profile.3fb9fed576da4b28386a.png"
                    alt="bg"
                    className="user__background"
                />
                <div className="user__avt">
                    <img
                        src={require('@assets/image/avatar.jpg')}
                        className="user__avt-img"
                        alt="avt"
                    />
                    <div className="user__avt-name">
                        {userContext.displayName}
                    </div>
                </div>
            </div>

            <div className="user__container">
                <div className="user__left">
                    <div className="user__box">
                        <div className="user__box-heading">
                            Thông tin cá nhân
                        </div>
                        <div className="user__box-desc">
                            <FontAwesomeIcon
                                icon={faSignature}
                                className="user__box-icon"
                            />
                            {`${user.firstName || ''} ${
                                user.lastName || ''
                            }`}
                        </div>

                        <div className="user__box-desc">
                            <FontAwesomeIcon
                                icon={faUser}
                                className="user__box-icon"
                            />
                            {user.username || ''}
                        </div>

                        <div className="user__box-desc">
                            <FontAwesomeIcon
                                icon={faEnvelope}
                                className="user__box-icon"
                            />
                            {user.email || ''}
                        </div>

                        <div className="user__box-desc">
                            <FontAwesomeIcon
                                icon={faCakeCandles}
                                className="user__box-icon"
                            />
                            {(user.dob &&
                                new Date(user.dob).toLocaleDateString(
                                    'vi'
                                )) ||
                                ''}
                        </div>
                    </div>
                </div>
                <div className="user__right">
                    <div className="user__box">
                        <div className="user__box-heading">
                            Các khóa học đã tham gia
                        </div>
                        {courses.length > 0 ? (
                            courses.map((course) => (
                                <UserCourse
                                    key={course._id}
                                    studentCourse={course}
                                />
                            ))
                        ) : (
                            <span className="user__no-course">
                                Bạn chưa đăng ký khóa học nào. Hãy
                                tham gia học tập để nâng cao kiến thức
                                nhé!
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;
