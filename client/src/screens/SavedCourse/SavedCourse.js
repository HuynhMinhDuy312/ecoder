import { CourseUserPreview } from '@components';
import React from 'react';
import './SavedCourse.scss';

import controllers from '@controllers/controller-factory';

function SavedCourse(props) {
    const [courses, setCourses] = React.useState([]);

    React.useEffect(() => {
        controllers.student.getSavedCourse(setCourses);
    }, []);

    const handleDelete = (course) => {
        controllers.student.deleteSavedCourse(course._id, setCourses);
    };

    return (
        <div className="save">
            <div className="save__heading">
                Các khóa học được lưu để xem sau
            </div>
            <div className="save__quan">
                Bạn đã lưu
                <span style={{ margin: '0 4px', fontWeight: '700' }}>
                    {courses.length}
                </span>
                khóa học của ECoder
            </div>
            {courses.map((course) => (
                <React.Fragment>
                    <div className="save__course">
                        <div className="save__course-heading">
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

export default SavedCourse;
