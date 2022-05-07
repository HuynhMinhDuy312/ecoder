import {
    faCirclePlay,
    faMinus,
    faPlus,
    faFileText,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './Chapter.module.scss';

function Chapter({ chapter }) {
    const [open, setOpen] = React.useState(true);
    const [lessonVisible, setLessonVisible] = React.useState(false);
    const [flag, setFlag] = React.useState(true);

    const handleOpen = () => {
        if (flag) {
            setFlag(false);
            setOpen(false);
            setLessonVisible(true);
        } else {
            setFlag(true);
            setOpen(true);
            setLessonVisible(false);
        }
    };
    return (
        <React.Fragment>
            <div
                className={styles.chapter}
                onClick={() => handleOpen()}
            >
                <div className={styles.chapter__right}>
                    {open && (
                        <FontAwesomeIcon
                            icon={faPlus}
                            className={styles.chapter__icon}
                        />
                    )}
                    {!open && (
                        <FontAwesomeIcon
                            icon={faMinus}
                            className={styles.chapter__icon}
                        />
                    )}
                    <span
                        className={styles.chapter__heading}
                    >{`${chapter.position}. ${chapter.name}`}</span>
                </div>
                <div className={styles.chapter__left}>
                    {chapter.lessonQuantity} bài học
                </div>
            </div>
            {lessonVisible &&
                chapter.lessons &&
                chapter.lessons.map((lesson) => (
                    <React.Fragment>
                        <div className={styles.chapter__lesson}>
                            <div
                                className={
                                    styles.chapter__lesson_right
                                }
                            >
                                {lesson.media === 'text' ? (
                                    <FontAwesomeIcon
                                        icon={faFileText}
                                        className={
                                            styles.chapter__lesson_icon_text
                                        }
                                    />
                                ) : (
                                    <FontAwesomeIcon
                                        icon={faCirclePlay}
                                        className={
                                            styles.chapter__lesson_icon
                                        }
                                    />
                                )}
                                <span
                                    className={
                                        styles.chapter__lesson_heading
                                    }
                                >
                                    {lesson.name}
                                </span>
                            </div>
                            <div
                                className={
                                    styles.chapter__lesson_left
                                }
                            >
                                {lesson.totalTime &&
                                    `${lesson.totalTime.minute}:${lesson.totalTime.second}`}
                            </div>
                        </div>
                    </React.Fragment>
                ))}
        </React.Fragment>
    );
}

export default Chapter;
