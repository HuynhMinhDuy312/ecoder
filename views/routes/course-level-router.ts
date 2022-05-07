/**
 * Author: Nam Dinh
 * Created At: Thu Apr 14 2022
 * File name: course-level-router.ts
 */

import { Router } from 'express';
import courseLevelController from '@controllers/course-level-controller';

// Router
const router = Router();

// Paths
export const p = {
    get: '/all',
    add: '/add',
    update: '/update',
    delete: '/delete/:id',
} as const;

/**
 * Get all students.
 */
router.get(p.get, courseLevelController.show);

/**
 * Add one student.
 */
router.post(p.add, courseLevelController.create);

export default router;
