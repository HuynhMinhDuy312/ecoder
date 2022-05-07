import { Response } from 'express';

export const awaitHandler = (res: Response, callback: Function) => {
    try {
        return callback();
    } catch (err) {
        return res.status(err.HttpStatus).json({ error: err.msg });
    }
};
