import {
    faAngleLeft,
    faAngleRight,
    faArrowRight,
    faComments,
    faFilePen,
    faList,
    faPlus,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useParams } from 'react-router-dom';
import {
    Comments,
    Note,
    SmallChapter,
    LessonNavigation,
    VideoLesson,
    TextLesson,
    PaginationBar,
} from '@components';
import './Lesson.scss';

import controllers from '@controllers/controller-factory';
import clsx from 'clsx';

function Lesson() {
    const { slug } = useParams();
    const [course, setCourse] = React.useState({});
    const [lesson, setLesson] = React.useState({});
    const [currentLesson, setCurrentLesson] = React.useState({});
    const [currentLessonIndex, setCurrentLessonIndex] =
        React.useState(0);
    const scrolledWindow = React.useRef(null);
    const [notes, setNotes] = React.useState([]);

    const [openNoteList, setOpenNoteList] = React.useState(false);

    const [range, setRange] = React.useState('current');

    const [open, setOpen] = React.useState(true);

    // Comments
    const [show, setShow] = React.useState(false);
    const [ask, setAsk] = React.useState('');
    const [comments, setComments] = React.useState([]);
    const [totalCommentPage, setTotalCommentPage] = React.useState(0);
    const [selectedCommentPage, setSelectedCommentPage] =
        React.useState(0);

    React.useEffect(() => {
        controllers.course.fetchStudentCourse(
            slug,
            setCourse,
            setCurrentLessonIndex
        );
    }, []);

    React.useEffect(() => {
        if (show) {
            controllers.course.getCommentPages(
                currentLesson._id,
                setTotalCommentPage
            );
        }
    }, [show, currentLesson]);

    React.useEffect(() => {
        if (totalCommentPage) {
            setSelectedCommentPage(1);
        }
    }, [totalCommentPage]);

    React.useEffect(() => {
        if (
            show &&
            selectedCommentPage &&
            totalCommentPage &&
            selectedCommentPage <= totalCommentPage
        ) {
            controllers.course.getAllComments(
                currentLesson._id,
                selectedCommentPage,
                setComments
            );
        }
    }, [show, selectedCommentPage, totalCommentPage, currentLesson]);

    React.useEffect(() => {
        let lessonToSet = [];

        if (course.chapters) {
            course.chapters.forEach((chapter) => {
                if (chapter.lessons) {
                    lessonToSet = [
                        ...lessonToSet,
                        ...chapter.lessons,
                    ];
                }
            });
        }

        setLesson(lessonToSet);
    }, [course.chapters]);

    React.useEffect(() => {
        if (
            lesson.length > 0 &&
            currentLessonIndex <= lesson.length
        ) {
            setCurrentLesson(lesson[currentLessonIndex - 1]);
        }
    }, [currentLessonIndex, lesson]);

    React.useEffect(() => {
        if (openNoteList) {
            if (range === 'all') {
                controllers.student.getCourseNotes(
                    course._id,
                    setNotes
                );
            } else if (range === 'current') {
                controllers.student.getLessonNotes(
                    currentLesson._id,
                    setNotes
                );
            }
        }
    }, [openNoteList, course, range, currentLesson._id]);

    const handleShowHide = () => {
        if (open) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    };

    const handleAsk = () => {
        if (!show) {
            setShow(true);
            document.body.style.overflow = 'hidden';
        } else {
            setShow(false);
            document.body.style.overflow = 'unset';
        }
    };

    const handleOpenNoteList = () => {
        if (openNoteList) {
            document.body.style.overflow = 'unset';
            setOpenNoteList(false);
        } else {
            document.body.style.overflow = 'hidden';
            setOpenNoteList(true);
        }
    };

    const handleSelectRange = (e) => {
        setRange(e.target.value);
    };

    const handleOnUpdateSubmit = (note, newContent) => {
        controllers.student.updateNote(
            note._id,
            newContent,
            setNotes
        );
    };

    const handleOnDeleteNote = (note) => {
        controllers.student.deleteNote(note._id, setNotes);
    };

    const handleOnAddComment = (e) => {
        if (e.key === 'Enter') {
            if (ask) {
                controllers.student.addComment(
                    currentLesson._id,
                    ask,
                    setComments
                );
                setAsk('');
            }
        }
    };

    const handleReplySubmit = (lesson, content, parentId) => {
        if (content) {
            controllers.student.addComment(
                lesson,
                content,
                setComments,
                parentId,
                selectedCommentPage
            );
        }
    };

    return (
        <React.Fragment>
            <div className="lesson">
                <LessonNavigation
                    slug={slug}
                    currentLesson={currentLesson}
                    learnedQuantity={course.lastLesson - 1}
                    lessonQuantity={course.lessonQuantity}
                />
                <div
                    className={`lesson__content ${
                        open ? 'normal' : 'wide'
                    }`}
                    ref={scrolledWindow}
                >
                    <div className="lesson__content-main-section">
                        {currentLesson.media === 'youtube' ? (
                            <VideoLesson
                                currentLesson={currentLesson}
                                course={course}
                                setCourse={setCourse}
                            />
                        ) : (
                            <TextLesson
                                currentLesson={currentLesson}
                                course={course}
                                setCourse={setCourse}
                                scrolledWindow={
                                    scrolledWindow.current
                                }
                            />
                        )}
                    </div>

                    <div className="lesson__credit">
                        Made with{' '}
                        <span style={{ color: '#F0592A' }}>Love</span>{' '}
                        - Powered by{' '}
                        <span style={{ color: '#00ACEE' }}>
                            ECoder
                        </span>
                    </div>
                </div>
                {open && (
                    <div className="lesson__chapters">
                        <div className="lesson__chapters-heading">
                            <div className="lesson__chapters-text">
                                Nội dung khóa học
                            </div>
                            <div
                                className="lesson__chapters-note"
                                onClick={() => handleOpenNoteList()}
                            >
                                <FontAwesomeIcon icon={faFilePen} />{' '}
                                Ghi chú
                            </div>
                        </div>
                        {course.chapters &&
                            course.chapters.map((chapter) => (
                                <SmallChapter
                                    key={chapter._id}
                                    chapter={chapter}
                                    currentIndex={currentLessonIndex}
                                    setCurrentIndex={
                                        setCurrentLessonIndex
                                    }
                                />
                            ))}
                    </div>
                )}
            </div>

            <button
                className="lesson__ask"
                onClick={() => handleAsk()}
            >
                <FontAwesomeIcon
                    icon={faComments}
                    className="lesson__ask-icon"
                />
                Hỏi đáp
            </button>

            <div className="lesson__navigation">
                <div className="lesson__navigation-button">
                    <button
                        className={clsx(
                            'lesson__navigation-button-prev',
                            {
                                'lesson__navigation-button--disabled':
                                    currentLessonIndex === 1,
                            }
                        )}
                        disabled={
                            currentLessonIndex === 1 ? 'disabled' : ''
                        }
                        onClick={() =>
                            setCurrentLessonIndex(
                                currentLessonIndex - 1
                            )
                        }
                    >
                        <FontAwesomeIcon
                            icon={faAngleLeft}
                            className="lesson__navigation-button-icon"
                        />
                        BÀI TRƯỚC
                    </button>
                    <button
                        className={clsx(
                            'lesson__navigation-button-next',
                            {
                                'lesson__navigation-button--disabled':
                                    currentLessonIndex >=
                                    course.lastLesson,
                            }
                        )}
                        disabled={
                            currentLessonIndex >= course.lastLesson
                                ? 'disabled'
                                : ''
                        }
                        onClick={() =>
                            setCurrentLessonIndex(
                                currentLessonIndex + 1
                            )
                        }
                    >
                        BÀI TIẾP THEO
                        <FontAwesomeIcon
                            icon={faAngleRight}
                            className="lesson__navigation-button-icon"
                        />
                    </button>
                </div>
                <div
                    className="lesson__navigation-showhide"
                    onClick={() => handleShowHide()}
                >
                    {open && <FontAwesomeIcon icon={faArrowRight} />}
                    {!open && <FontAwesomeIcon icon={faList} />}
                </div>
            </div>

            {show && (
                <React.Fragment>
                    <div
                        className="blackscreen"
                        onClick={() => handleAsk()}
                    ></div>
                    <div className="commentsbox">
                        <div className="comments">
                            <div className="comments__heading">
                                {comments.length} lời hỏi đáp
                            </div>
                            <div className="comments__spam">
                                (Nếu thấy bình luận spam, các bạn bấm
                                report giúp admin nhé)
                            </div>
                            <div className="comments__ask">
                                <img
                                    src={require('@assets/image/avatar.jpg')}
                                    alt="avt"
                                    className="comments__avatar"
                                />
                                <input
                                    className="comments__input"
                                    placeholder="Bạn có thắc mắc gì trong bài học này?"
                                    type="text"
                                    value={ask}
                                    onChange={(e) =>
                                        setAsk(e.target.value)
                                    }
                                    onKeyDown={handleOnAddComment}
                                />
                            </div>

                            <div className="comments__section">
                                <Comments
                                    handleReplySubmit={
                                        handleReplySubmit
                                    }
                                    comments={comments}
                                />
                            </div>

                            {totalCommentPage > 0 && (
                                <div className="comments__pagination">
                                    <PaginationBar
                                        totalPage={totalCommentPage}
                                        noPages={9}
                                        columnWidth={40}
                                        currentPage={
                                            selectedCommentPage
                                        }
                                        setCurrentPage={
                                            setSelectedCommentPage
                                        }
                                    />
                                </div>
                            )}
                        </div>

                        <div
                            className="comments__close"
                            onClick={() => handleAsk()}
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </div>
                    </div>
                </React.Fragment>
            )}
            {openNoteList && (
                <React.Fragment>
                    <div
                        className="blackscreen"
                        onClick={() => handleOpenNoteList()}
                    ></div>
                    <div className="listbox">
                        <div className="notelist">
                            <div className="notelist__heading">
                                <div className="notelist__heading-text">
                                    Ghi chú của tôi
                                </div>
                                <div className="notelist__heading-selections">
                                    <select
                                        value={range}
                                        className="notelist__heading-range"
                                        onChange={handleSelectRange}
                                    >
                                        <option value="current">
                                            Trong bài học hiện tại
                                        </option>
                                        <option value="all">
                                            Toàn bộ khóa học
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div className="notelist__list">
                                {notes.map((note, index) => (
                                    <Note
                                        note={note}
                                        key={note._id}
                                        handleOnUpdateSubmit={
                                            handleOnUpdateSubmit
                                        }
                                        handleOnDeleteNote={
                                            handleOnDeleteNote
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                        <div
                            className="notelist__close"
                            onClick={() => handleOpenNoteList()}
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </div>
                    </div>
                </React.Fragment>
            )}
        </React.Fragment>
    );
}

export default Lesson;
