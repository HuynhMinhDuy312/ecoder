import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LanguagePreview.module.scss';

function LanguagePreview({ language }) {
    return (
        <div className={styles.cpl}>
            <Link
                to={`/courses?lang=${language.slug}`}
                className={language.cpl__left}
            >
                <img
                    alt="course"
                    src={language.image}
                    className={styles.cpl__img}
                />
            </Link>

            <div className={styles.cpl__right}>
                <Link
                    to={`/courses/${language.slug}`}
                    className={styles.cpl__heading}
                >
                    {language.name}
                </Link>
                
                <div className={styles.cpl__desc}>
                    {language.description}
                </div>
            </div>
        </div>
    );
}

export default LanguagePreview;
