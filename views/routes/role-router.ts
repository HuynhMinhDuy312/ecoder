/**
 * Author: Nam Dinh
 * Created At: Mon Apr 18 2022
 * File name: role-router.ts
 */

import { Router } from 'express';
import roleController from '@controllers/role-controller';

// Router
const router = Router();

// Paths
export const p = {
    add: '/add',
} as const;

/**
 * Add one student.
 */
router.post(p.add, roleController.create);

export default router;
