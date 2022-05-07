/**
 * Author: Nam Dinh
 * Created At: Mon Apr 18 2022
 * File name: test-router.ts
 */

import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';

import { jwtPassport, priviledge } from '@middlewares/index';

// Router
const router = Router();

// Paths
export const p = {
    protectedRoute: '/protected-route',
    adminRoute: '/admin-route',
    studentRoute: '/student-route',
} as const;

// router.use(
//     jwtPassport.authenticate('jwt', { session: false }),
//     priviledge.isAdmin
// );

// router.get('/', (req: Request, res: Response) => {
//     res.send('NOT NEED TO AUTHORIZE');
// });

router.get(
    p.protectedRoute,
    jwtPassport.authenticate('jwt', { session: false }),
    (req: Request, res: Response, next: NextFunction) => {
        res.json({
            message: 'This is protected route',
            user: req.user,
        });
    }
);

router.get(
    p.adminRoute,
    jwtPassport.authenticate('jwt', { session: false }),
    priviledge.isAdmin,
    (req: Request, res: Response, next: NextFunction) => {
        res.json({
            message: 'This is admin route',
        });
    }
);

router.get(
    p.studentRoute,
    jwtPassport.authenticate('jwt', { session: false }),
    priviledge.isStudent,
    (req: Request, res: Response, next: NextFunction) => {
        res.json({
            message: 'This is admin route',
        });
    }
);

export default router;
