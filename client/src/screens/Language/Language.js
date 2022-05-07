import React from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CourseLanguage, Input } from '@components';

import styles from './Language.module.scss';

import controllers from '@controllers/controller-factory';
import _ from 'lodash';

import { useThrottle } from '@hooks';

function Language() {
    const [languages, setLanguages] = React.useState([]);
    const [foundLanguages, setFoundsLanguages] = React.useState([]);
    const [searchText, setSearchText] = React.useState('');

    React.useEffect(() => {
        controllers.language.fetchAll(setLanguages);
    }, []);

    const search = () => {
        if (searchText.length > 0) {
            const founds = _.filter(languages, (language) =>
                language.name
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
            );
            setFoundsLanguages(founds);
        } else {
            setFoundsLanguages(languages);
        }
    };

    const throttleSearch = useThrottle(search, 1000);

    React.useEffect(throttleSearch, [searchText, languages]);

    const handleSearchTextChange = (e) => {
        setSearchText(e.target.value);
    };

    return (
        <div className={styles.languages}>
            <div className={styles.languages__heading}>
                Ngôn ngữ lập trình
            </div>
            <div className={styles.languages__desc}>
                Đây là các ngôn ngữ lập trình có trên website ECoder.
            </div>

            <div className={styles.languages__searchBar}>
                <FontAwesomeIcon
                    icon={faSearch}
                    className="nav__search-icon"
                />
                <input
                    className={styles.languages__search}
                    type="text"
                    placeholder="Nhập từ khóa tìm kiếm..."
                    value={searchText}
                    onChange={handleSearchTextChange}
                />
            </div>
            <div className={styles.languages__list}>
                {foundLanguages.map((language) => (
                    <CourseLanguage
                        key={language._id}
                        language={language}
                    />
                ))}
            </div>
        </div>
    );
}

export default Language;
