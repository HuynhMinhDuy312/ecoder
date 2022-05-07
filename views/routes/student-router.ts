import { Router } from 'express';
import studentController from '@controllers/student-controller';
import { jwtPassport } from '@middlewares/index';

// Router
const router = Router();

// Paths
export const p = {
    get: '/all',
    add: '/add',
    course: '/course',
    favoriteCourse: '/favorite-course',
    deletefavoriteCourse: '/favorite-course/delete',
    savedCourse: '/saved-course',
    deleteSavedCourse: '/saved-course/delete',
    note: '/note',
    updateNote: '/note/update',
    deleteNote: '/note/delete',
    update: '/update',
    delete: '/delete/:id',
} as const;

/**
 * Get all students.
 */
router.get(p.get, studentController.show);

/**
 * Add one student.
 */
router.post(p.add, studentController.create);

/**
 * Get current user courses.
 */
router.get(
    p.course,
    jwtPassport.authenticate('jwt', { session: false }),
    studentController.course
);

/**
 * Get current user favorite courses.
 */
router.get(
    p.favoriteCourse,
    jwtPassport.authenticate('jwt', { session: false }),
    studentController.favoriteCourse
);

/**
 * Add favorite courses.
 */
router.post(
    p.favoriteCourse,
    jwtPassport.authenticate('jwt', { session: false }),
    studentController.postFavoriteCourse
);

/**
 * Delete favorite courses.
 */
router.post(
    p.deletefavoriteCourse,
    jwtPassport.authenticate('jwt', { session: false }),
    studentController.deleteFavoriteCourse
);

/**
 * Get current user favorite courses.
 */
router.get(
    p.savedCourse,
    jwtPassport.authenticate('jwt', { session: false }),
    studentController.savedCourse
);

/**
 * Add saved courses.
 */
router.post(
    p.savedCourse,
    jwtPassport.authenticate('jwt', { session: false }),
    studentController.postSavedCourse
);

/**
 * Delete saved courses.
 */
router.post(
    p.deleteSavedCourse,
    jwtPassport.authenticate('jwt', { session: false }),
    studentController.deleteSavedCourse
);

/**
 * Add note
 */
router.get(
    p.note,
    jwtPassport.authenticate('jwt', { session: false }),
    studentController.getNote
);

/**
 * Add note
 */
router.post(
    p.note,
    jwtPassport.authenticate('jwt', { session: false }),
    studentController.postNote
);

/**
 * Update note
 */
router.post(
    p.updateNote,
    jwtPassport.authenticate('jwt', { session: false }),
    studentController.putNote
);

/**
 * Delete note
 */
router.post(
    p.deleteNote,
    jwtPassport.authenticate('jwt', { session: false }),
    studentController.deleteNote
);

export default router;
