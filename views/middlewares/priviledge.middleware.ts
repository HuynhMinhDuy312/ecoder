import { Request, Response, NextFunction } from 'express';
import { IUser } from '@model-types';

class Priviledge {
    #contructor() {}

    public static isAdmin = (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        if (req.user && (req.user as IUser).role === 'admin') {
            next();
        } else {
            res.status(403).json({ error: 'Access denied.' });
        }
    };

    public static isStudent = (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        if (req.user && (req.user as IUser).role === 'student') {
            next();
        } else {
            res.status(403).json({ error: 'Access denied.' });
        }
    };
}

export default Priviledge;
