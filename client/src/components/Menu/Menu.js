import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBook,
    faBookBookmark,
    faHouse,
    faUserClock,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import './Menu.scss';

import controllers from '@controllers/controller-factory';

function Menu() {
    const [languages, setLanguages] = React.useState([]);

    React.useEffect(() => {
        controllers.language.fetchAll(setLanguages);
    }, []);

    return (
        <div className="menu">
            <div className="menu__home">
                <ul className="menu__list">
                    <li className="menu__item">
                        <Link to="/" className="menu__link">
                            <FontAwesomeIcon
                                icon={faHouse}
                                size="3x"
                                className="menu__icon"
                            />
                            <span className="menu__text">Home</span>
                        </Link>
                    </li>
                    <li className="menu__item menu__hover">
                        <div to="/courses" className="menu__link">
                            <FontAwesomeIcon
                                icon={faBook}
                                size="3x"
                                className="menu__icon"
                            />
                            <span className="menu__text">
                                Khóa học
                            </span>
                        </div>
                        <div className="menu__langtype">
                            <div className="LangType">
                                <div className="LangType__heading">
                                    Ngôn ngữ lập trình
                                </div>
                                <ul className="LangType__list">
                                    {languages.map((language) => (
                                        <li
                                            className="LangType__item"
                                            key={language._id}
                                        >
                                            <Link
                                                to={`/courses/search?lang=${language.slug}`}
                                                className="LangType__link"
                                            >
                                                {language.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li className="menu__item">
                        <Link
                            to="/favorite-course"
                            className="menu__link"
                        >
                            <FontAwesomeIcon
                                icon={faBookBookmark}
                                size="3x"
                                className="menu__icon"
                            />
                            <span className="menu__text">
                                Yêu thích
                            </span>
                        </Link>
                    </li>
                    <li className="menu__item">
                        <Link
                            to="/saved-course"
                            className="menu__link"
                        >
                            <FontAwesomeIcon
                                icon={faUserClock}
                                size="3x"
                                className="menu__icon"
                            />
                            <span className="menu__text">
                                Xem sau
                            </span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Menu;
