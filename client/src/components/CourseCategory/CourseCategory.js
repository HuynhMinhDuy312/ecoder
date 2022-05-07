// React components
import controllers from '@controllers/controller-factory';
// Font-awesome
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import {
    CourseLanguage,
    CoursePreview,
    ToastMessage,
    ToastMessageType,
} from '@components';
// Self-defined
import './CourseCategory.scss';

function CourseCategory(props) {
    const [languages, setLanguages] = React.useState([]);
    const [popularCourses, setPopularCourses] = React.useState([]);
    const [toastMessageOpen, setToastMessageOpen] = React.useState({
        isVisible: false,
        type: ToastMessageType.ERROR,
        msg: {
            title: 'Thông báo lỗi',
            desc: 'Bạn đã làm sai cái gì đó rồi',
            duration: 3000,
        },
    });

    React.useEffect(() => {
        controllers.language.fetchPreviewLanguage(setLanguages);
        controllers.course.getPopularCourse(setPopularCourses);
    }, []);

    return (
        <React.Fragment>
            <div className="category">
                <div className="category__heading">
                    <span className="category__heading-name">
                        Các khóa học nổi bật
                    </span>
                    <Link
                        to="/courses/popular"
                        className="category__heading-specific"
                    >
                        Xem chi tiết
                        <FontAwesomeIcon
                            icon={faAngleRight}
                            className="category__heading-icon"
                        />
                    </Link>
                </div>
                <div className="category__list">
                    {popularCourses.map((course) => (
                        <CoursePreview
                            key={course._id}
                            course={course}
                            setToastMessageOpen={setToastMessageOpen}
                        />
                    ))}
                </div>
            </div>

            <div className="category">
                <div className="category__heading">
                    <span className="category__heading-name">
                        Ngôn ngữ lập trình
                    </span>
                    <Link
                        to="/languages"
                        className="category__heading-specific"
                    >
                        Xem tất cả
                        <FontAwesomeIcon
                            icon={faAngleRight}
                            className="category__heading-icon"
                        />
                    </Link>
                </div>

                <div className="category__list">
                    {languages.map((language) => (
                        <CourseLanguage
                            key={language._id}
                            language={language}
                        />
                    ))}
                </div>
            </div>

            <ToastMessage
                open={toastMessageOpen}
                setOpen={setToastMessageOpen}
            />
        </React.Fragment>
    );
}

export default CourseCategory;
