import React from 'react';
import clsx from 'clsx';

import { Link } from 'react-router-dom';
import styles from './CourseUserPreview.module.scss';

function CourseUserPreview({ course, handleDelete }) {
    return (
        <div className={styles.cpl}>
            <img
                alt="course"
                src={course.image}
                className={styles.cpl__img}
            />
            <div className={styles.cpl__right}>
                <div className={styles.cpl__introduction}>
                    <div className={styles.cpl__heading}>
                        {course.name}
                    </div>
                    <div className={styles.cpl__desc}>
                        {course.introduction}
                    </div>
                </div>
                <div className={styles.cpl__button}>
                    <button
                        className={clsx(
                            styles.cpl__btn,
                            styles.cpl__lowPriority
                        )}
                        onClick={handleDelete}
                    >
                        Xóa
                    </button>
                    <Link
                        to={`/courses/${course.slug}`}
                        className={styles.cpl__btn}
                    >
                        Xem khóa học
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CourseUserPreview;
