import { Router } from 'express';
import userController from '@controllers/user-controller';
import { jwtPassport } from '@middlewares/index';

// Constants
const router = Router();

// Paths
export const p = {
    get: '/all',
    info: '/info',
    add: '/add',
    update: '/update',
    delete: '/delete/:id',
} as const;

/**
 * Get all users.
 */

/**
 * Get current user.
 */
router.get(
    p.info,
    jwtPassport.authenticate('jwt', { session: false }),
    userController.info
);
// Export default
export default router;
