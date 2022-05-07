import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Youtube from 'react-youtube';

import './VideoLesson.scss';
import { ToastMessage, ToastMessageType } from '@components';

import utils from '@controllers/utils';

import controllers from '@controllers/controller-factory';

function VideoLesson({ currentLesson, course, setCourse }) {
    const [openNote, setOpenNote] = React.useState({
        isVisible: false,
        time: {
            hour: 0,
            minute: 0,
            second: 0,
        },
    });

    const videoRef = React.useRef(null);
    const [videoReady, setVideoReady] = React.useState(false);
    const [endTimeout, setEndTimeout] = React.useState(false);
    const [toastMessageOpen, setToastMessageOpen] = React.useState({
        isVisible: false,
        type: ToastMessageType.ERROR,
        msg: {
            title: 'Thông báo lỗi',
            desc: 'Bạn đã làm sai cái gì đó rồi',
            duration: 3000,
        },
    });
    const [newNote, setNewNote] = React.useState('');

    const handleOnNewNoteSubmit = (e) => {
        e.preventDefault();

        if (newNote) {
            const time =
                openNote.time.hour * 3600 +
                openNote.time.minute * 60 +
                openNote.time.second;
            controllers.student.addNote(
                course._id,
                currentLesson._id,
                time,
                newNote,
                setToastMessageOpen
            );
            setNewNote('');
        }
    };

    const handleOpenNote = () => {
        const internalPlayer = videoRef.current.internalPlayer;

        if (internalPlayer && !openNote.isVisible) {
            internalPlayer.pauseVideo();

            internalPlayer.getCurrentTime().then((res) =>
                setOpenNote({
                    isVisible: true,
                    time: utils.convertSecondToViewedString(
                        Math.floor(res)
                    ),
                })
            );
        }
    };

    const handleLessonEnded = () => {
        if (currentLesson.position === course.lastLesson) {
            if (!endTimeout) {
                // Show error
                setToastMessageOpen({
                    isVisible: true,
                    type: ToastMessageType.ERROR,
                    msg: {
                        title: 'Thông báo lỗi',
                        desc: 'Bạn phải học đủ thời gian của bài học',
                        duration: 3000,
                    },
                });
            } else if (!course.isCompleted) {
                // Send complete lesson
                controllers.course.completeLesson(
                    course.slug,
                    setCourse
                );
            }
        }
    };

    React.useEffect(() => {
        let timeLeft = 0;

        if (videoReady && videoRef) {
            videoRef.current.internalPlayer
                .getDuration()
                .then((duration) => {
                    timeLeft = setTimeout(() => {
                        setEndTimeout(true);
                    }, duration * 1000);
                });
        }

        return () => {
            if (!timeLeft) {
                clearTimeout(timeLeft);
            }
        };
    }, [videoReady, videoRef]);

    return (
        <React.Fragment>
            <div className="lesson__video" id={'video-player'}>
                <Youtube
                    opts={{
                        width: '1000',
                        height: '500',
                    }}
                    videoId={currentLesson.content}
                    onReady={(e) =>
                        setVideoReady(!!e.target.getVideoUrl())
                    }
                    onEnd={handleLessonEnded}
                    ref={videoRef}
                />
            </div>
            <div className="lesson__headingsection">
                <div className="lesson__heading">
                    {currentLesson.name}
                    <div className="lesson__update">
                        Cập nhất vào{' '}
                        {currentLesson.updatedAt &&
                            new Date(
                                currentLesson.updatedAt
                            ).toLocaleDateString('vi')}
                    </div>
                </div>
                <div
                    className="lesson__note"
                    onClick={() => handleOpenNote()}
                >
                    <FontAwesomeIcon
                        icon={faPlus}
                        className="lesson__note-icon"
                    />
                    Thêm ghi chú
                </div>
            </div>
            <div className="lesson__description">
                {course.introduction}
            </div>

            {openNote.isVisible && (
                <form
                    className={`lesson__editor ${
                        openNote.isVisible
                            ? 'editor-active'
                            : 'editor-unactive'
                    }`}
                    onSubmit={handleOnNewNoteSubmit}
                >
                    <div className="lesson__editor-heading">
                        Thêm ghi chú tại
                        <span className="lesson__editor-time">
                            {openNote.time.hour != '00'
                                ? `${openNote.time.hour}:`
                                : '' +
                                  `${openNote.time.minute}:${openNote.time.second}`}
                        </span>
                    </div>
                    <textarea
                        placeholder="Nội dung ghi chú..."
                        className="lesson__editor-input"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                    />
                    <div className="lesson__editor-btn">
                        <button
                            className="lesson__editor-cancel"
                            onClick={() =>
                                setOpenNote({
                                    ...openNote,
                                    isVisible: false,
                                })
                            }
                        >
                            Hủy bỏ
                        </button>
                        <input
                            type="submit"
                            className="lesson__editor-create"
                            value="Tạo ghi chú"
                        />
                    </div>
                </form>
            )}

            <ToastMessage
                open={toastMessageOpen}
                setOpen={setToastMessageOpen}
            />
        </React.Fragment>
    );
}

export default VideoLesson;
