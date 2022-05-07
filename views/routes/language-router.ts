/**
 * Author: Nam Dinh
 * Created At: Wed Apr 13 2022
 * File name: language-router.ts
 */

import { Router } from 'express';
import languageController from '@controllers/language-controller';

// Router
const router = Router();

// Paths
export const p = {
    getAll: '/all',
    preview: '/preview',
    add: '/add',
    update: '/update',
    updateOne: '/update',
    deleteOne: '/delete',
    get: '/:id',
} as const;

/**
 * Get all languages.
 */
router.get(p.getAll, languageController.showPreview);

/**
 * Get all languages.
 */
router.get(p.preview, languageController.showPreview);

/**
 * Add one language.
 */
router.post(p.add, languageController.create);

/**
 * Update one language.
 */
router.post(p.updateOne, languageController.updateOne);

/**
 * Delete one language.
 */
router.post(p.deleteOne, languageController.deleteOne);

/**
 * Get one language by id
 */
router.get(p.get, languageController.index);

export default router;
