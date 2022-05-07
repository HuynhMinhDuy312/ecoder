import { faFileText } from '@fortawesome/free-regular-svg-icons';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React from 'react';
import './SmallLesson.scss';

function SmallLesson({ lesson, currentIndex, setCurrentIndex }) {
    const handleSmallLesson = () => {
        if (lesson.content) {
            setCurrentIndex(lesson.position);
        }
    };
    return (
        <div
            className={clsx(`smalllesson`, {
                selected: currentIndex === lesson.position,
                active: lesson.content,
            })}
            onClick={() => handleSmallLesson()}
        >
            <span className="smalllesson__heading">
                {lesson.position + '. ' + lesson.name}
            </span>
            
            <div className="smalllesson__info">
                {lesson.media === 'text' ? (
                    <FontAwesomeIcon
                        icon={faFileText}
                        className="smalllesson__icon_text"
                    />
                ) : (
                    <FontAwesomeIcon
                        icon={faCirclePlay}
                        className="smalllesson__icon"
                    />
                )}
                <div className="smalllesson__duration">
                    {lesson.totalTime &&
                        `${lesson.totalTime.minute}:${lesson.totalTime.second}`}
                </div>
            </div>
        </div>
    );
}

export default SmallLesson;
