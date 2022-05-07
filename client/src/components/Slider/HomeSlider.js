import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import "./HomeSlider.scss";

function HomeSlider(props) {
    return (
        <div className="slider">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                pagination={{
                    el: ".my-custom-pagination",
                    clickable: true,
                    renderBullet: (index, className) => {
                        return '<span class="' + className + '"></span>';
                    },
                }}
                navigation={{
                    nextEl: ".swiper-button-next-unique",
                    prevEl: ".swiper-button-prev-unique",
                }}
                spaceBetween={0}
                slidesPerView={1}
                speed={1000}
                autoplay
                loop={true}
                loopedSlides={4}
            >
                <SwiperSlide>
                    <img src={require("../img/HTML.jpg")} alt="html" className="slider__img" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={require("../img/CSS.jpg")} alt="css" className="slider__img" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={require("../img/JS.jpg")} alt="JS" className="slider__img" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={require("../img/SQL.jpg")} alt="SQL" className="slider__img" />
                </SwiperSlide>
            </Swiper>
            <div className="my-custom-pagination" />
            <div className="swiper-button-prev-unique">
                <FontAwesomeIcon icon={faAngleLeft} />
            </div>
            <div className="swiper-button-next-unique">
                <FontAwesomeIcon icon={faAngleRight} />
            </div>
        </div>
    );
}

export default HomeSlider;
