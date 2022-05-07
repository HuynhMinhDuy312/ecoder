import { Request, Response, NextFunction } from 'express';
import logger from 'jet-logger';
import odm from '@repos/odm';
import { DatabaseConnectionError } from '../shared/errors';

export default async (
    _: Request,
    __: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Connect to database
        await odm.connectDb(process.env.CONNECTION_STRING as string);
        // Config database
        odm.configDb();
        // Next middleware
        next();
    } catch (error) {
        logger.err(
            `Connection String: ${process.env.CONNECTION_STRING}`
        );
        logger.err(error);
        next(new DatabaseConnectionError());
    }
};
