import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Rating from 'react-rating';
import './UserReview.scss';

function UserReview({ review }) {
    return (
        <div className="userreview">
            <div className="userreview__user">
                <img
                    className="userreview__avatar"
                    alt="avt"
                    src={
                        review.avatar ||
                        'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg'
                    }
                />
                <div className="userreview__username">
                    {review.user && review.user.displayName}
                </div>
            </div>
            <div className="userreview__score">
                <Rating
                    emptySymbol={
                        <FontAwesomeIcon
                            icon={faStar}
                            className="userreview__empty"
                        />
                    }
                    fullSymbol={
                        <FontAwesomeIcon
                            icon={faStar}
                            className="userreview__full"
                        />
                    }
                    initialRating={review.rating}
                />
                {review.title}
            </div>
            <div className="userreview__timestamp">
                Đánh giá vào ngày{' '}
                {review.updatedAt &&
                    new Date(review.updatedAt).toLocaleDateString(
                        'vi'
                    )}
            </div>
            <div className="userreview__comment">
                {review.content}
            </div>
        </div>
    );
}

export default UserReview;
