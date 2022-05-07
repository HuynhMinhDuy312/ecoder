import { CoursePreviewLess } from '@components';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import {
    ToastMessage,
    ToastMessageType,
    PaginationBar,
} from '@components';
import styles from './Courses.module.scss';

import controllers from '@controllers/controller-factory';
import { useLocation } from 'react-router-dom';

function Courses() {
    const location = useLocation();

    const [selectedPage, setSelectedPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState(0);

    const [toastMessageOpen, setToastMessageOpen] = React.useState({
        isVisible: false,
        type: ToastMessageType.ERROR,
        msg: {
            title: 'Thông báo lỗi',
            desc: 'Bạn đã làm sai cái gì đó rồi',
            duration: 3000,
        },
    });
    const [courses, setCourses] = React.useState([]);

    React.useEffect(() => {
        controllers.course.getTotalPage(
            location.search,
            setTotalPage
        );
    }, [location.search]);

    React.useEffect(() => {
        if (totalPage) {
            setSelectedPage(1);
        } else {
            setCourses([]);
        }
    }, [totalPage]);

    React.useEffect(() => {
        if (totalPage && selectedPage && selectedPage <= totalPage) {
            controllers.course.getAll(
                selectedPage,
                location.search,
                setCourses
            );
        }
    }, [selectedPage, totalPage]);

    return (
        <div className={styles.courses}>
            <div className={styles.courses__heading}>Khóa học</div>
            <div className={styles.courses__note}>
                Các khóa học có thể chưa được hoàn thiện, ECoder sẽ cố
                gắng cập nhất các khóa học sớm nhất có thể
                <FontAwesomeIcon
                    icon={faHeart}
                    className={styles.courses__noteIcon}
                />
            </div>

            <div className={styles.courses__list}>
                {courses.map((course) => (
                    <CoursePreviewLess
                        key={course._id}
                        course={course}
                        setToastMessageOpen={setToastMessageOpen}
                    />
                ))}
            </div>

            {totalPage > 0 && (
                <div className="course__review-pagination">
                    <PaginationBar
                        totalPage={totalPage}
                        noPages={9}
                        columnWidth={40}
                        currentPage={selectedPage}
                        setCurrentPage={setSelectedPage}
                    />
                </div>
            )}

            <ToastMessage
                open={toastMessageOpen}
                setOpen={setToastMessageOpen}
            />
        </div>
    );
}

export default Courses;
