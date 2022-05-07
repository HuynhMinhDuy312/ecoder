import React from "react";
import "./LanguageType.scss";

function LanguageType(props) {
    return (
        <div className="LangType">
            <div className="LangType__heading">Ngôn ngữ lập trình</div>
            <ul className="LangType__list">
                <li className="LangType__item">HTML</li>
                <li className="LangType__item">CSS</li>
                <li className="LangType__item">Javascript</li>
                <li className="LangType__item">SQL</li>
            </ul>
        </div>
    );
}

export default LanguageType;
