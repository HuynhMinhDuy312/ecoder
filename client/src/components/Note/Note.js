import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Note.scss';

function Note({ note, handleOnUpdateSubmit, handleOnDeleteNote }) {
    const [edit, setEdit] = React.useState({
        isVisible: false,
        newContent: '',
    });

    React.useEffect(() => {
        if (note.content) {
            setEdit({
                ...edit,
                newContent: note.content,
            });
        }
    }, [note]);

    return (
        <React.Fragment>
            <div className="note">
                <div className="note__heading">
                    <div className="note__left">
                        <div className="note__timestamp">
                            {note.time &&
                                (note.time.hour != '00'
                                    ? `${note.time.hour}:`
                                    : '' +
                                      `${note.time.minute}:${note.time.second}`)}
                        </div>
                        <div className="note__title">
                            {note.lesson && note.lesson.name}
                        </div>
                    </div>
                    <div className="note__right">
                        <FontAwesomeIcon
                            icon={faPen}
                            className="note__icon"
                            onClick={() =>
                                setEdit({ ...edit, isVisible: true })
                            }
                        />
                        <FontAwesomeIcon
                            icon={faTrash}
                            className="note__icon"
                            onClick={() => handleOnDeleteNote(note)}
                        />
                    </div>
                </div>
                {(edit.isVisible && (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();

                            handleOnUpdateSubmit(
                                note,
                                edit.newContent
                            );
                            setEdit({
                                isVisible: false,
                                newContent: '',
                            });
                        }}
                    >
                        <textarea
                            placeholder={note.content}
                            className="note__input"
                            value={edit.newContent}
                            onChange={(e) =>
                                setEdit({
                                    ...edit,
                                    newContent: e.target.value,
                                })
                            }
                        />
                        <div className="note__btn">
                            <button
                                className="note__cancel"
                                onClick={() =>
                                    setEdit({
                                        ...edit,
                                        isVisible: false,
                                    })
                                }
                            >
                                Hủy bỏ
                            </button>
                            <button className="note__save">
                                Lưu lại
                            </button>
                        </div>
                    </form>
                )) || (
                    <div className="note__content">
                        {note.content}
                    </div>
                )}
            </div>
        </React.Fragment>
    );
}

export default Note;
