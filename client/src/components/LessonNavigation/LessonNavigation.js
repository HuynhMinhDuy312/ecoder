import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import logo from '@assets/image/logo.jpg';

import styles from './LessonNavigation.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';

function LearningNavigation({
    slug,
    currentLesson,
    learnedQuantity,
    lessonQuantity,
}) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleBackButton = () => {
        const params = new URLSearchParams(location.search);
        const redirect = params.get('redirect');
        if (redirect) {
            navigate(redirect);
        } else {
            navigate(`/courses/${slug}`);
        }
    };

    return (
        <div className={styles.nav}>
            <div className={styles.leftNav}>
                <FontAwesomeIcon
                    icon={faAngleLeft}
                    className={styles.leftNavIcon}
                    onClick={handleBackButton}
                />
                <img
                    src={logo}
                    alt="ECoder logo"
                    className={styles.leftNavLogo}
                    onClick={() => navigate('/')}
                />
                <span className={styles.leftNavTitle}>
                    {currentLesson && currentLesson.name}
                </span>
            </div>

            <div className={styles.rightNav}>
                <div className={styles.rightNavLearningStatus}>
                    <span>{learnedQuantity || 0}</span>
                    <span>/</span>
                    <span>{lessonQuantity || 0}</span>
                    bài học
                </div>
            </div>
        </div>
    );
}

export default LearningNavigation;
