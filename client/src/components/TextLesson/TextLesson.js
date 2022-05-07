import React from 'react';
import { marked } from 'marked';

import styles from './TextLesson.module.scss';

import controllers from '@controllers/controller-factory';
import _ from 'lodash';

function TextLesson({
    currentLesson,
    course,
    setCourse,
    scrolledWindow,
}) {
    const content = React.useRef(null);

    React.useEffect(() => {
        const handleLessonEnded = (e) => {
            const scrollBottom =
                e.target.scrollTop + e.target.offsetHeight;

            if (scrollBottom + 120 >= e.target.scrollHeight) {
                if (currentLesson.position === course.lastLesson) {
                    if (!course.isCompleted) {
                        // Send complete lesson
                        scrolledWindow.removeEventListener(
                            'scroll',
                            handleScroll
                        );
                        controllers.course.completeLesson(
                            course.slug,
                            setCourse,
                            () => {
                                scrolledWindow.addEventListener(
                                    'scroll',
                                    handleScroll
                                );
                            }
                        );
                    }
                }
            }
        };

        const handleScroll = _.throttle(handleLessonEnded, 1000);

        if (scrolledWindow) {
            scrolledWindow.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (scrolledWindow) {
                scrolledWindow.removeEventListener(
                    'scroll',
                    handleScroll
                );
            }
        };
    }, [scrolledWindow, course]);

    React.useEffect(() => {
        if (currentLesson.content) {
            content.current.innerHTML = marked.parse(
                currentLesson.content,
                {
                    headerIds: false,
                }
            );
        }
    }, [currentLesson.content]);

    return (
        <div className={styles.textWrapper}>
            <div className={styles.textTitle}>
                {currentLesson.name}
            </div>
            <div className={styles.textCreated}>
                Cập nhật vào
                <span>
                    {new Date(
                        currentLesson.updatedAt
                    ).toLocaleDateString('vi')}
                </span>
            </div>
            <div className={styles.textLesson} ref={content}></div>;
        </div>
    );
}

export default TextLesson;
