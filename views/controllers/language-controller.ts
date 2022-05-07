/**
 * Author: Nam Dinh
 * Created At: Wed Apr 13 2022
 * File name: language-controller.ts
 */

import StatusCodes from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';

import languageService from '@services/language-service';
import { awaitHandler } from './utils/await-handler';

const { CREATED, OK } = StatusCodes;

/**
 * Controller for language
 */
class LanguageController {
    show = async (_: Request, res: Response) => {
        return awaitHandler(res, async () => {
            const languages = await languageService.getAll();
            return res.status(OK).json(languages);
        });
    };
    
    showPreview = async (_: Request, res: Response) => {
        return awaitHandler(res, async () => {
            const languages = await languageService.getPreviewLanguages();
            return res.status(OK).json(languages);
        });
    };

    create = async (req: Request, res: Response) => {
        const language = req.body;
        console.log(language);

        return awaitHandler(res, async () => {
            if (Array.isArray(language)) {
                const createdLanguages =
                    await languageService.addMany(language);
                return res.status(CREATED).json(createdLanguages);
            }

            const createdLanguage = await languageService.addOne(
                language
            );
            return res.status(CREATED).json(createdLanguage);
        });
    };

    index = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const id = req.params.id;

        if (id) {
            return awaitHandler(res, async () => {
                const language = await languageService.getById(id);

                return res.status(OK).json(language);
            });
        }

        return next();
    };

    updateOne = async (req: Request, res: Response) => {
        const language = req.body;

        return awaitHandler(res, async () => {
            const successCount = await languageService.updateOne(
                language
            );
            return res.status(OK).json(successCount);
        });
    };

    deleteOne = async (req: Request, res: Response) => {
        const id = req.body.id;

        return awaitHandler(res, async () => {
            const successCount = await languageService.deleteOne(id);
            return res.status(OK).json(successCount);
        });
    };
}

export default new LanguageController();
