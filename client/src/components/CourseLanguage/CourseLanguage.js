import React from "react";
import { Link } from "react-router-dom";
import "./CourseLanguage.scss";

function CourseLanguage({ language }) {
    return (
        <div className="chapter__item">
            <Link to={`/courses/search?lang=${language.slug}`} className="chapter__item-link">
                <img loading="lazy" src={language.image} alt="img" className="chapter__img" />
                <div className="chapter__button">Học các khóa học</div>
            </Link>
            <div className="chapter__text">
                <Link className="chapter__link" to={`/courses?lang=${language.slug}`}>
                    {language.name}
                </Link>
                <div className="chapter__desc">{language.description}</div>
            </div>
        </div>
    );
}

export default CourseLanguage;
