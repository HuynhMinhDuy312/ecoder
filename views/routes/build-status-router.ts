/**
 * Author: Nam Dinh
 * Created At: Wed Apr 13 2022
 * File name: build-status-router.ts
 */

import { Router } from 'express';
import buildStatusController from '@controllers/build-status-controller';

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
// router.get(p.get, buildStatusController.show);

/**
 * Add one student.
 */
router.post(p.add, buildStatusController.create);

export default router;
