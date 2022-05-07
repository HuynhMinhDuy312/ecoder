/**
 * Author: Nam Dinh
 * Created At: Fri Apr 15 2022
 * File name: lesson-router.ts
 */

import { Router } from 'express';
import lessonController from '@controllers/lesson-controller';

// Router
const router = Router();

// Paths
export const p = {
    get: '/index/:id',
    getAll: '/all',
    add: '/add',
    update: '/update',
    delete: '/delete/:id',
    getByQuery: '/',
} as const;

/**
 * Get all lessons.
 */
router.get(p.getAll, lessonController.show);

/**
 * Get a lesson by id.
 */
router.get(p.get, lessonController.index);

/**
 * Add one lesson.
 */
router.post(p.add, lessonController.create);

/**
 * Get lessons by query string.
 */
router.get(p.getByQuery, lessonController.showByCourseId);

export default router;
