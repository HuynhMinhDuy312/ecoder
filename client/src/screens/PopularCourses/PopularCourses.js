import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { CoursePreviewLess } from '@components';

import { ToastMessageType, ToastMessage } from '@components';
import './PopularCourses.scss';

import controllers from '@controllers/controller-factory';

function PopularCourses() {
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
        controllers.course.getPopularCourse(setCourses);
    }, []);

    return (
        <div className="courses">
            <div className="courses__heading">
                Các khóa học nổi bật
            </div>
            <div className="courses__desc">
                Đây là các khóa học nổi bật được các học viên của
                ECoder đăng kí nhiều nhất. Dựa vào các khóa học này,
                các bạn có thể học được các ngôn ngữ lập trình theo ý
                thích của bản thân và có thể sử dụng các kinh nghiệm
                của người dạy truyền đạt lại.
                <br />
                <br />
                Tại Việt Nam, các công việc về lập trình đang được săn
                đón rất nhiều và các lập trình viên là một nguồn nhân
                lực quan trọng trong thời đại 4.0.
                <br />
                <br />
                Bởi vì thế, các khóa học này sẽ giúp các bạn có thể
                trở thành một lập trình viên với bất kì 1 ngôn ngữ nào
                bạn thích.
            </div>
            <div className="courses__note">
                Các khóa học có thể chưa được hoàn thiện, ECoder sẽ cố
                gắng cập nhất các khóa học sớm nhất có thể
                <FontAwesomeIcon
                    icon={faHeart}
                    className="courses__note-icon"
                />
            </div>
            <div className="courses__list">
                {courses.map((course) => (
                    <CoursePreviewLess
                        key={course._id}
                        course={course}
                        setToastMessageOpen={setToastMessageOpen}
                    />
                ))}
            </div>

            <ToastMessage
                open={toastMessageOpen}
                setOpen={setToastMessageOpen}
            />
        </div>
    );
}

export default PopularCourses;
