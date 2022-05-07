import { Chapter, UserReview, PaginationBar } from '@components';
import controllers from '@controllers/controller-factory';
import {
    faAngleRight,
    faBookOpenReader,
    faCheck,
    faCircle,
    faClock,
    faCubes,
    faStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Rating from 'react-rating';
import { Link, useNavigate, useParams } from 'react-router-dom';

import './Course.scss';

import { UserContext } from '@components/context';
import clsx from 'clsx';

const reviewTitles = [
    'Rất không hài lòng',
    'Không hài lòng',
    'Bình thường',
    'Hài lòng',
    'Rất hài lòng',
];

function Course() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const userContext = React.useContext(UserContext);
    const [isPending, setTransition] = React.useTransition();

    const [course, setCourse] = React.useState({
        isRegistered: false,
        isCompleted: false,
        ratingQuantity: 0,
        reviews: [],
    });

    const [review, setReview] = React.useState({
        content: '',
        rating: 0,
        title: '',
    });

    const [selectedPage, setSelectedPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState(0);

    React.useEffect(() => {
        controllers.course.fetchBySlug(
            slug,
            setCourse,
            setTransition
        );
    }, []);

    React.useEffect(() => {
        if (course._id) {
            controllers.course.fetchTotalReviews(
                course,
                setTotalPage
            );
        }
    }, [course._id]);

    React.useEffect(() => {
        if (totalPage > 0) setSelectedPage(1);
    }, [totalPage]);

    React.useEffect(() => {
        controllers.course.fetchReviews(
            course,
            selectedPage,
            setCourse
        );
    }, [course._id, selectedPage]);

    React.useEffect(() => {
        if (!userContext.token) {
            setCourse({
                ...course,
                isRegistered: false,
                isCompleted: false,
            });
        } else {
            controllers.course.persist(
                slug,
                setCourse,
                setTransition
            );
        }
    }, [userContext]);

    const handleRegisterCourse = () => {
        if (userContext.token != null) {
            controllers.course.register(course._id, setCourse);
        } else {
            navigate({
                pathname: '/authentication',
                search: `?redirect=/courses/${slug}`,
            });
        }
    };

    const handleSubmitReview = (e) => {
        e.preventDefault();

        if (review.rating && review.content) {
            controllers.course.submitReview(
                course._id,
                review,
                userContext,
                setCourse,
                setReview
            );
        }
    };

    return (
        <div className="course">
            <div className="course__banner">
                <div className="course__banner-path">
                    {course.language && (
                        <Link
                            to={`/courses?lang=${course.language.slug}`}
                            className="course__banner-language-link"
                        >
                            {course.language.name}
                        </Link>
                    )}
                    <FontAwesomeIcon
                        icon={faAngleRight}
                        className="course__banner-icon"
                    />
                    <span className="user-noselect">
                        {course.name}
                    </span>
                </div>
                <div className="course__banner-heading">
                    {course.name}
                </div>
                <div className="course__banner-rating">
                    <Rating
                        emptySymbol={
                            <FontAwesomeIcon
                                icon={faStar}
                                className="course__banner-rating-empty"
                            />
                        }
                        fullSymbol={
                            <FontAwesomeIcon
                                icon={faStar}
                                className="course__banner-rating-full"
                            />
                        }
                        initialRating={Math.round(course.rating || 0)}
                    />
                    <span className="course__banner-rating-score">
                        {course.rating || 0}
                    </span>
                    <div className="course__banner-quan">
                        {course.ratingQuantity} lượt đánh giá
                    </div>
                </div>
                <div className="course__banner-reg">
                    {(course.isRegistered && (
                        <Link
                            className="course__banner-btn"
                            to={`/${slug}/learn`}
                        >
                            Tiếp tục học
                        </Link>
                    )) || (
                        <button
                            className="course__banner-btn"
                            onClick={() => handleRegisterCourse()}
                        >
                            Đăng ký học
                        </button>
                    )}
                    <div className="course__banner-reg-information">
                        <div className="course__banner-text">
                            {course.followedQuantity} người đăng ký
                        </div>
                        <div className="course__banner-text">
                            {course.completedQuantity} người hoàn
                            thành
                        </div>
                    </div>
                </div>
                <div className="course__banner-misc">
                    <div className="course__banner-level">
                        <FontAwesomeIcon
                            icon={faCubes}
                            className="course__banner-misc-icon"
                        />
                        {course.level && course.level.description}
                    </div>
                    <div className="course__banner-lessons">
                        <FontAwesomeIcon
                            icon={faBookOpenReader}
                            className="course__banner-misc-icon"
                        />
                        Tổng số
                        <span
                            style={{
                                fontWeight: 700,
                                margin: '0 6px',
                            }}
                        >
                            {course.lessonQuantity}
                        </span>
                        bài học
                    </div>
                    <div className="course__banner-duration">
                        <FontAwesomeIcon
                            icon={faClock}
                            className="course__banner-misc-icon"
                        />
                        Thời lượng
                        <span
                            style={{
                                fontWeight: 700,
                                margin: '0 6px',
                            }}
                        >
                            {course.totalTime &&
                                `${course.totalTime.minute} phút ${course.totalTime.second} giây`}
                        </span>
                    </div>
                </div>
            </div>
            <div className="course__description">
                <div className="course__heading">Giới thiệu</div>
                <div className="course__description-desc">
                    {course.introduction}
                </div>
            </div>
            <div className="course__misc">
                <div className="course__content">
                    <div className="course__heading">
                        Nội dung khóa học
                    </div>
                    <div className="course__counter">
                        <span
                            style={{
                                fontWeight: 700,
                                margin: '0 6px',
                            }}
                        >
                            {course.chapterQuantity}
                        </span>
                        chương
                        <FontAwesomeIcon
                            icon={faCircle}
                            className="course__counter-icon"
                        />
                        <span
                            style={{
                                fontWeight: 700,
                                margin: '0 6px',
                            }}
                        >
                            {course.lessonQuantity}
                        </span>
                        bài học
                        <FontAwesomeIcon
                            icon={faCircle}
                            className="course__counter-icon"
                        />
                        Thời lượng
                        <span
                            style={{
                                fontWeight: 700,
                                margin: '0 6px',
                            }}
                        >
                            {course.totalTime &&
                                `${course.totalTime.minute} : ${course.totalTime.second} `}
                        </span>
                    </div>
                    <div className="course__chapters">
                        {course.chapters &&
                            course.chapters.map((chapter) => (
                                <Chapter
                                    key={chapter._id}
                                    chapter={chapter}
                                />
                            ))}
                    </div>
                </div>
                <div className="course__goal">
                    <div className="course__goal-text">
                        <div className="course__heading">Yêu cầu</div>
                        <ul className="course__goal-list">
                            {course.requirements &&
                                course.requirements.map(
                                    (requirement, index) => (
                                        <li
                                            className="course__goal-item"
                                            key={`${course._id}_${index}_requirement`}
                                        >
                                            <FontAwesomeIcon
                                                icon={faCheck}
                                                className="course__goal-icon"
                                            />
                                            {requirement}
                                        </li>
                                    )
                                )}
                        </ul>
                    </div>
                    <div className="course__goal-text">
                        <div className="course__heading">
                            Mục tiêu
                        </div>
                        <ul className="course__goal-list">
                            {course.objectives &&
                                course.objectives.map(
                                    (objective, index) => (
                                        <li
                                            className="course__goal-item"
                                            key={`${course._id}_${index}_objective`}
                                        >
                                            <FontAwesomeIcon
                                                icon={faCheck}
                                                className="course__goal-icon"
                                            />
                                            {objective}
                                        </li>
                                    )
                                )}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="course__review">
                <div className="course__yourreview">
                    <div className="course__review-heading">
                        Đánh giá của bạn về khóa học
                    </div>

                    {!userContext.token ? (
                        <div className="course__yourreview-comment">
                            <span className="course__yourreview-requirement">
                                Vui lòng
                                <Link
                                    to={`/authentication?redirect=/courses/${slug}`}
                                    className="course__yourreview-link"
                                >
                                    đăng nhập
                                </Link>
                                để đánh giá.
                            </span>
                        </div>
                    ) : !course.isCompleted ? (
                        <div className="course__yourreview-comment">
                            <span className="course__yourreview-requirement">
                                Vui lòng hoàn thành khóa học để đánh
                                giá.
                            </span>
                        </div>
                    ) : (
                        <form
                            className="course__yourreview-comment"
                            onSubmit={handleSubmitReview}
                        >
                            <div className="course__yourreview-score">
                                <span className="course__yourreview-score-heading">
                                    Bạn đánh giá khóa học này như thế
                                    nào?
                                </span>
                                <div className="course__yourreview-star">
                                    <Rating
                                        emptySymbol={
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className="course__yourreview-empty"
                                            />
                                        }
                                        fullSymbol={
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className="course__yourreview-full"
                                            />
                                        }
                                        onChange={(newRating) =>
                                            setReview({
                                                ...review,
                                                rating: newRating,
                                                title:
                                                    newRating > 0
                                                        ? reviewTitles[
                                                              newRating -
                                                                  1
                                                          ]
                                                        : '',
                                            })
                                        }
                                        initialRating={review.rating}
                                    />
                                    {review.title}
                                </div>
                            </div>

                            <textarea
                                className="course__yourreview-textarea"
                                placeholder="Đánh giá của bạn..."
                                value={review.content}
                                onChange={(e) =>
                                    setReview({
                                        ...review,
                                        content: e.target.value,
                                    })
                                }
                            />

                            <input
                                type="submit"
                                className={clsx(
                                    'course__yourreview-submit',
                                    {
                                        'course__yourreview-submit--disabled':
                                            !review.rating ||
                                            !review.content,
                                    }
                                )}
                                value="Gửi đánh giá"
                            />
                        </form>
                    )}
                </div>

                <div className="course__userreview">
                    <div className="course__review-heading">
                        Đánh giá của các học viên về khóa học
                    </div>
                    <div className="course__review-box">
                        {course.reviews.map((review) => (
                            <UserReview
                                review={review}
                                key={review._id}
                            />
                        ))}
                        {totalPage > 0 && (
                            <div className="course__review-pagination">
                                <PaginationBar
                                    totalPage={totalPage}
                                    noPages={9}
                                    columnWidth={40}
                                    currentPage={selectedPage}
                                    setCurrentPage={setSelectedPage}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Course;
