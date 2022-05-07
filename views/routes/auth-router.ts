/**
 * Author: Nam Dinh
 * Created At: Mon Apr 18 2022
 * File name: auth-router.ts
 */

import { Router } from 'express';
import authController from '@controllers/auth-controller';
import { jwtPassport } from '@middlewares/index';

// Router
const router = Router();

// Paths
export const p = {
    signIn: '/sign-in',
    signUp: '/sign-up',
    signOut: '/sign-out',
} as const;

/**
 * Sign In
 */
router.post(p.signIn, authController.signIn);

/**
 * Sign In
 */
router.post(p.signUp, authController.signUp);

/**
 * Sign Out
 */
router.get(
    p.signOut,
    jwtPassport.authenticate('jwt', { session: false }),
    authController.signOut
);

export default router;
