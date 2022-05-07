import React from 'react';
import { Link } from 'react-router-dom';
import './UserCourse.scss';

function UserCourse({ studentCourse }) {
    return studentCourse.course ? (
        <div className="user__course">
            <img
                src={studentCourse.course.image}
                className="user__course-img"
                alt="course"
            />
            <div className="user__course-text">
                <div className="user__course-heading">
                    {studentCourse.course.name}
                </div>

                <div className="user__course-desc">
                    {studentCourse.course.introduction}
                </div>

                <Link
                    className="user__course-btn"
                    to={`/${studentCourse.course.slug}/learn?redirect=/user`}
                >
                    {studentCourse.status ? `Ôn tập` : 'Tiếp tục học'}
                </Link>
            </div>
        </div>
    ) : (
        <React.Fragment />
    );
}

export default UserCourse;
