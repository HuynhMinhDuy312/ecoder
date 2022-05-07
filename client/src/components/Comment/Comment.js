import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Comments } from '@components';
import React from 'react';

import styles from './Comment.module.scss';

function Comment({ comment, handleReplySubmit }) {
    const [reply, setReply] = React.useState({
        isVisible: false,
        content: '',
    });

    return (
        <div className={styles.comment} key={comment._id}>
            <img
                alt="alt"
                src={
                    comment.avatar ||
                    require('@assets/image/avatar.jpg')
                }
                className={styles.comment__avatar}
            />
            <div className={styles.comment__content}>
                <div className={styles.comment__bubble}>
                    <div className={styles.comment__username}>
                        {comment.user && comment.user.displayName}
                    </div>
                    <div className={styles.comment__text}>
                        {comment.content}
                    </div>
                </div>
                <div className={styles.comment__misc}>
                    <div
                        className={styles.comment__answer}
                        onClick={() =>
                            setReply({
                                ...reply,
                                isVisible: !reply.isVisible,
                            })
                        }
                    >
                        Trả lời
                    </div>
                    <FontAwesomeIcon
                        icon={faCircle}
                        className={styles.comment__dot}
                    />
                    <div className={styles.comment__postat}>
                        {comment.createdAt &&
                            `${new Date(
                                comment.createdAt
                            ).toLocaleDateString('vi')} ${new Date(
                                comment.createdAt
                            ).toLocaleTimeString('vi')}`}
                    </div>
                </div>
                {comment.children && comment.children.length > 0 && (
                    <div className={styles.comment__children}>
                        <Comments
                            handleReplySubmit={handleReplySubmit}
                            comments={comment.children}
                        />
                    </div>
                )}
                {reply.isVisible && (
                    <div className={styles.reply}>
                        <img
                            src={require('@assets/image/avatar.jpg')}
                            alt="avt"
                            className={styles.reply__avatar}
                        />

                        <input
                            className={styles.reply__input}
                            placeholder="Nhập phản hồi của bạn..."
                            type="text"
                            value={reply.content}
                            onChange={(e) =>
                                setReply({
                                    ...reply,
                                    content: e.target.value,
                                })
                            }
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleReplySubmit(
                                        comment.lesson,
                                        reply.content,
                                        comment._id
                                    );
                                    setReply({
                                        isVisible: false,
                                        content: '',
                                    });
                                }
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Comment;
