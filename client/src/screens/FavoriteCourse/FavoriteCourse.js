import { CourseUserPreview } from '@components';
import React from 'react';
import './FavoriteCourse.scss';

import controllers from '@controllers/controller-factory';

function FavoriteCourse() {
    const [courses, setCourses] = React.useState([]);

    React.useEffect(() => {
        controllers.student.getFavoriteCourse(setCourses);
    }, []);

    const handleDelete = (course) => {
        controllers.student.deleteFavoriteCourse(course._id, setCourses);
    };

    return (
        <div className="fav">
            <div className="fav__heading">
                Các khóa học yêu thích của bạn
            </div>
            <div className="fav__quan">
                Bạn đã yêu thích
                <span style={{ margin: '0 4px', fontWeight: '700' }}>
                    {courses.length}
                </span>
                khóa học của ECoder
            </div>
            {courses.map((course) => (
                <React.Fragment key={course._id}>
                    <div className="fav__course">
                        <div className="fav__course-heading">
                            {course.name}
                        </div>
                        <CourseUserPreview
                            course={course}
                            handleDelete={() => handleDelete(course)}
                        />
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
}

export default FavoriteCourse;
