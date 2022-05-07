import { Router } from 'express';

import { connectDb, jwtPassport } from '@middlewares/index';
import {
    userRouter,
    roleRouter,
    buildStatusRouter,
    chapterRouter,
    courseLevelRouter,
    courseRouter,
    languageRouter,
    lessonRouter,
    studentRouter,
    authRouter,
    testRouter,
} from '.';

// Export the base-router
const baseRouter = Router();

baseRouter.use(connectDb);
baseRouter.use(jwtPassport.initialize());

// Setup routers
baseRouter.use('/auth', authRouter);
baseRouter.use('/users', userRouter);
baseRouter.use('/roles', roleRouter);
baseRouter.use('/students', studentRouter);
baseRouter.use('/languages', languageRouter);
baseRouter.use('/build-statuses', buildStatusRouter);
baseRouter.use('/course-levels', courseLevelRouter);
baseRouter.use('/courses', courseRouter);
baseRouter.use('/lessons', lessonRouter);
baseRouter.use('/chapters', chapterRouter);

baseRouter.use('/test', testRouter);

// Export default.
export default baseRouter;
