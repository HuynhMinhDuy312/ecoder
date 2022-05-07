import CoursePreviewLess from "@components/CoursePreviewLess/CoursePreviewLess";
import React from "react";
import "./History.scss";

function History(props) {
    const courses = [
        {
            id: 1,
            reg: "12/04/2022",
            last: "20/04/2022",
            content: {
                title: "Khóa học javascript cơ bản dành cho người mới bắt đầu",
                desc: "Trong khóa học này chúng ta sẽ học javascript cơ bản dành cho người chưa từng học lập trình. Đồng thời chúng ta sẽ được hướng dẫn xây dựng 1 music player đơn giản.",
                img: "https://nordiccoder.com/app/uploads/2019/12/50-javascript.jpg",
            },
        },
        {
            id: 2,
            reg: "16/03/2022",
            last: "27/03/2022",
            content: {
                title: "Khóa học HTML & CSS",
                desc: "Trong khóa học này chúng ta sẽ được học cách sử dụng HTML & CSS từ cơ bản đến nâng cao và sẽ được hướng dẫn cách clone lại trang youtube.",
                img: "https://cafedev.vn/wp-content/uploads/2020/11/cafedev_khoahoc_htmlcss.png",
            },
        },
        {
            id: 3,
            reg: "28/03/2022",
            last: "5/04/2022",
            content: {
                title: "Responsive với Grid System",
                desc: "Trong khóa học này chúng ta sẽ được học cách sử dụng responsive với trang youtube mà chúng ta đã clone lại với Grid System",
                img: "https://i0.wp.com/www.silocreativo.com/en/wp-content/uploads/2014/03/images-responsive.png?fit=666%2C370&quality=100&strip=all&ssl=1",
            },
        },
    ];

    return (
        <div className="history">
            <div className="history__heading">Lịch sử khóa học</div>
            <div className="history__quan">
                Bạn đã đăng ký
                <span style={{ margin: "0 4px", fontWeight: "700" }}>3</span>
                khóa học của ECoder
            </div>
            {courses.map((course) => (
                <React.Fragment>
                    <div className="history__course">
                        <div className="history__course-heading">{course.content.title}</div>
                        <div className="history__course-reg">
                            Bạn đã đăng ký vào: <span style={{ margin: "0 4px", fontWeight: "700" }}>{course.reg}</span>
                        </div>
                        <div className="history__course-last">
                            Lần cuối bạn học là vào:{" "}
                            <span style={{ margin: "0 4px", fontWeight: "700" }}>{course.last}</span>
                        </div>
                        <CoursePreviewLess course={course.content} regged={true} />
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
}

export default History;
