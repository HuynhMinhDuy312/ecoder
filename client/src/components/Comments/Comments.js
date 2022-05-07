import React from 'react';
import { Comment } from '@components';
import './Comments.scss';

function Comments({ comments, handleReplySubmit }) {
    return (
        <React.Fragment>
            {comments.map((comment) => (
                <Comment
                    handleReplySubmit={handleReplySubmit}
                    key={comment._id}
                    comment={comment}
                />
            ))}
        </React.Fragment>
    );
}

export default Comments;
