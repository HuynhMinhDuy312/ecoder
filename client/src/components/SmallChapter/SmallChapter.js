import SmallLesson from '@components/SmallLesson/SmallLesson';
import {
    faAngleDown,
    faAngleUp,
    faCirclePlay,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './SmallChapter.scss';

function SmallChapter({ chapter, currentIndex, setCurrentIndex }) {
    const [open, setOpen] = React.useState(true);

    const handleSmallChap = () => {
        if (open) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    };

    return (
        <React.Fragment>
            <div
                className="smallchapter"
                onClick={() => handleSmallChap()}
            >
                <div className="smallchapter__info">
                    <div className="smallchapter__heading">
                        {chapter.position + '. ' + chapter.name}
                    </div>
                    <div className="smallchapter__number">
                        <div className="smallchapter__quan">
                            {chapter.lessonQuantity}
                        </div>
                        <div className="smallchapter__duration">
                            {chapter.totalTime &&
                                `${chapter.totalTime.minute}:${chapter.totalTime.second}`}
                        </div>
                    </div>
                </div>
                {!open && (
                    <FontAwesomeIcon
                        icon={faAngleDown}
                        className="smallchapter__icon"
                    />
                )}
                {open && (
                    <FontAwesomeIcon
                        icon={faAngleUp}
                        className="smallchapter__icon"
                    />
                )}
            </div>
            {open &&
                chapter.lessons &&
                chapter.lessons.map((lesson) => (
                    <SmallLesson
                        key={lesson._id}
                        lesson={lesson}
                        currentIndex={currentIndex}
                        setCurrentIndex={setCurrentIndex}
                    />
                ))}
        </React.Fragment>
    );
}

export default SmallChapter;
