/**
 * Author: Nam Dinh
 * Created At: Thu Apr 14 2022
 * File name: course-router.ts
 */

import { Router } from 'express';
import courseController from '@controllers/course-controller';
import { priviledge } from '@middlewares/index';
import passport from 'passport';

// Router
const router = Router();

// Paths
export const p = {
    getAll: '/all',
    add: '/add',
    update: '/update',
    delete: '/delete/:id',
    get: '/:slug',
    getByQuery: '/',
    persist: '/persist',
    register: '/register',
    getStudentCourse: '/student/:slug',
    postStudentCourse: '/student/:slug',
    coursePage: '/all/pages',
    reviews: '/reviews',
    reviewPages: '/reviews/pages',
    comments: '/comments',
    commentPages: '/comments/pages',
} as const;

/**
 * Add one course.
 */
router.post(
    p.add,
    passport.authenticate('jwt', { session: false }),
    priviledge.isAdmin,
    courseController.create
);

router.get(
    p.persist,
    passport.authenticate('jwt', { session: false }),
    courseController.isRegistered
);

router.get(
    p.register,
    passport.authenticate('jwt', { session: false }),
    courseController.register
);

router.get(
    p.getStudentCourse,
    passport.authenticate('jwt', { session: false }),
    courseController.indexStudentCourse
);

router.post(
    p.getStudentCourse,
    passport.authenticate('jwt', { session: false }),
    courseController.completeStudentCourse
);

// Reviews
router.post(
    p.reviews,
    passport.authenticate('jwt', { session: false }),
    courseController.createReview
);
router.get(p.reviews, courseController.getReviews);
router.get(p.reviewPages, courseController.getReviewPages);

// Comments
router.post(
    p.comments,
    passport.authenticate('jwt', { session: false }),
    courseController.postComment
);
router.get(p.comments, courseController.getCommentPage);
router.get(p.commentPages, courseController.countCommentPages);

/**
 * Get Page
 */
router.get(p.coursePage, courseController.getCoursePages);

/**
 * Get All
 */
router.get(p.getAll, courseController.showByQuery);

/**
 * Get course by slug
 */
router.get(p.get, courseController.index);

/**
 * Get course by query
 */
router.get(p.getByQuery, courseController.showByQuery);

export default router;
