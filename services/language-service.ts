/**
 * Author: Nam Dinh
 * Created At: Wed Apr 13 2022
 * File name: language-service.ts
 */

import { ILanguage } from '@model-types';
import Language from '@models/language-model';
import unitOfWork from '@repos/unit-of-work';
import slugify from 'slugify';

class LanguageService {
    getAll = async (): Promise<ILanguage[]> => {
        return await unitOfWork.languageRepo.getAll({
            isDeleted: false,
        });
    };

    getPreviewLanguages = async (): Promise<ILanguage[]> => {
        const result = await unitOfWork.languageRepo.getAll({
            limit: 10,
            isDeleted: false,
        });

        return result;
    };

    getById = async (id: string): Promise<ILanguage | null> => {
        return await unitOfWork.languageRepo.getById(id);
    };

    addOne = async (objLanguage: any): Promise<ILanguage> => {
        const language: ILanguage = new Language({
            ...objLanguage,
            slug: slugify(objLanguage.name, {
                lower: true,
            }),
        });
        return await unitOfWork.languageRepo.addOne(language);
    };

    addMany = async (objLanguages: any[]): Promise<ILanguage[]> => {
        const languages = objLanguages.map(
            (objLanguage) =>
                new Language({
                    ...objLanguage,
                    slug: slugify(objLanguage.name, {
                        lower: true,
                    }),
                }) as ILanguage
        );

        return await unitOfWork.languageRepo.addMany(languages);
    };

    updateOne = async (objLanguage: any): Promise<number> => {
        const language: ILanguage = new Language(objLanguage);
        return await unitOfWork.languageRepo.updateOne(language);
    };

    deleteOne = async (id: string): Promise<number> => {
        return await unitOfWork.languageRepo.deleteOne(id);
    };
}

export default new LanguageService();
