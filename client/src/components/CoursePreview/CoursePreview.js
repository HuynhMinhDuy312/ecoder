import {
    faBookBookmark,
    faCalendar,
    faUserClock,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import './CoursePreview.scss';

import controllers from '@controllers/controller-factory';

function CoursePreview({ course, setToastMessageOpen }) {
    const handleAddFavoriteCourseClick = () => {
        controllers.student.addFavoriteCourse(course._id, setToastMessageOpen);
    };

    const handleAddSavedCourseClick = () => {
        controllers.student.addSavedCourse(course._id, setToastMessageOpen);
    };
    return (
        <div className="preview__item">
            <Link
                to={`/courses/${course.slug}`}
                className="preview__item-link"
            >
                <img
                    src={course.image}
                    alt="img"
                    className="preview__img"
                />
                <div className="preview__button">Xem khóa học</div>
            </Link>
            <div className="preview__text">
                <Link
                    to={`/courses/${course.slug}}`}
                    className="preview__link"
                >
                    {course.name}
                </Link>
                <div className="preview__info">
                    <span className="preview__quan">
                        <FontAwesomeIcon
                            icon={faUsers}
                            className="preview__icon-quan"
                        />
                        {course.followedQuantity}
                    </span>
                    <span className="preview__update-and-function">
                        <span className="preview__update">
                            <FontAwesomeIcon
                                icon={faCalendar}
                                className="preview__icon"
                            />
                            Cập nhật:{' '}
                            {course.updatedAt &&
                                new Date(
                                    course.updatedAt
                                ).toLocaleDateString('vi-VN')}
                        </span>
                        <span className="preview__function">
                            <FontAwesomeIcon
                                icon={faBookBookmark}
                                className="preview__function-bm"
                                onClick={handleAddFavoriteCourseClick}
                            />
                            <FontAwesomeIcon
                                icon={faUserClock}
                                className="preview__function-later"
                                onClick={handleAddSavedCourseClick}
                            />
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default CoursePreview;
