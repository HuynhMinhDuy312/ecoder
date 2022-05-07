/**
 * Author: Nam Dinh
 * Created At: Sat Apr 16 2022
 * File name: chapter-router.ts
 */

import { Router } from 'express';
import chapterRouter from '@controllers/chapter-controller';

// Router
const router = Router();

// Paths
export const p = {
    add: '/add',
    update: '/update',
    delete: '/delete/:id',
    get: '/index/:id',
    getByQuery: '/',
} as const;

/**
 * Get one chapter by id
 */
router.get(p.get, chapterRouter.index);

/**
 * Add one chapter.
 */
router.post(p.add, chapterRouter.create);

/**
 * Get all chapters.
 */
router.get(p.getByQuery, chapterRouter.showByCourseId);

export default router;
