import React from 'react';
import CourseCategory from '@components/CourseCategory/CourseCategory';
import HomeSlider from '@components/Slider/HomeSlider';
import './Home.scss';
import ToastMessage from '@components/ToastMessage/ToastMessage';

function Home(props) {
    return (
        <React.Fragment>
            <div className="homepage">
                <HomeSlider />
                <CourseCategory />
            </div>
        </React.Fragment>
    );
}

export default Home;
