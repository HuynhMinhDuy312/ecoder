import React from 'react';
import { Link } from 'react-router-dom';
import {
    faBookBookmark,
    faUserClock,
    faUsers,
    faCalendar,
    faCheckCircle,
    faStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Rating from 'react-rating';
import styles from './CoursePreviewLess.module.scss';

import controllers from '@controllers/controller-factory';

function CoursePreviewLess({ course, setToastMessageOpen }) {
    const handleAddFavoriteCourseClick = () => {
        controllers.student.addFavoriteCourse(
            course._id,
            setToastMessageOpen
        );
    };

    const handleAddSavedCourseClick = () => {
        controllers.student.addSavedCourse(
            course._id,
            setToastMessageOpen
        );
    };
    return (
        <div className={styles.cpl}>
            <Link
                to={`/courses/${course.slug}`}
                className={course.cpl__left}
            >
                <img
                    loading="lazy"
                    alt="course"
                    src={course.image}
                    className={styles.cpl__img}
                />
            </Link>

            <div className={styles.cpl__right}>
                <div className={styles.cpl__header}>
                    <Link
                        to={`/courses/${course.slug}`}
                        className={styles.cpl__heading}
                    >
                        {course.name}
                    </Link>

                    <div className={styles.cpl__desc}>
                        {course.introduction}
                    </div>

                    <div className={styles.cpl__quantity}>
                        <div className={styles.cpl__rating}>
                            <Rating
                                emptySymbol={
                                    <FontAwesomeIcon
                                        icon={faStar}
                                        className={
                                            styles.cpl__rating__star_empty
                                        }
                                    />
                                }
                                fullSymbol={
                                    <FontAwesomeIcon
                                        icon={faStar}
                                        className={
                                            styles.cpl__rating__star_full
                                        }
                                    />
                                }
                                initialRating={Math.round(
                                    course.rating || 0
                                )}
                            />
                            <span
                                className={styles.cpl__rating__score}
                            >
                                {(course.rating != undefined &&
                                    `${course.rating} (${
                                        course.ratingQuantity || 0
                                    })`) ||
                                    0}
                            </span>
                        </div>

                        <span className={styles.personQuantity}>
                            {course.followedQuantity || 0} người theo
                            dõi
                        </span>

                        <span className={styles.personQuantity}>
                            {course.completedQuantit || 0} người hoàn
                            thành khóa học
                        </span>
                    </div>
                </div>

                <div className={styles.footer}>
                    <div className={styles.updatedContainer}>
                        <FontAwesomeIcon
                            icon={faCalendar}
                            className={styles.updatedIcon}
                        />
                        Cập nhật vào
                        {course.updatedAt &&
                            ` ${new Date(
                                course.updatedAt
                            ).toLocaleDateString('vi-VN')}`}
                    </div>

                    <span className={styles.footer__function}>
                        <FontAwesomeIcon
                            icon={faBookBookmark}
                            className={styles.footer__functionBm}
                            onClick={handleAddFavoriteCourseClick}
                        />
                        <FontAwesomeIcon
                            icon={faUserClock}
                            className={styles.footer__functionLater}
                            onClick={handleAddSavedCourseClick}
                        />
                    </span>
                </div>
            </div>
        </div>
    );
}

export default CoursePreviewLess;
