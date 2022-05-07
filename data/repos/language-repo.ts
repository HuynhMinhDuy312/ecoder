/**
 * Author: Nam Dinh
 * Created At: Wed Apr 13 2022
 * File name: language-repo.ts
 */

import { ObjectId } from 'mongodb';
import { HydratedDocument } from 'mongoose';
import { ILanguage } from '@model-types';
import { ILanguageRepo } from '@irepos';

import Language from '@models/language-model';

class LanguageRepo implements ILanguageRepo {
    async getAll(options: any): Promise<ILanguage[]> {
        const query = Language.find(options).lean();

        if (options.limit) {
            query.limit(options.limit);
        }

        const result = await query;

        return result;
    }

    async getBySlug(slug: string): Promise<ILanguage | null> {
        const query = Language.findOne({ slug }).lean();
        const result = await query;

        return result;
        
    }

    async getById(id: string): Promise<ILanguage | null> {
        return await Language.findById(id).lean();
    }

    async addOne(iLanguage: ILanguage): Promise<ILanguage> {
        return await Language.create(
            iLanguage as HydratedDocument<ILanguage>
        );
    }

    async addMany(languages: ILanguage[]): Promise<ILanguage[]> {
        return await Language.insertMany(languages);
    }

    async updateOne(language: ILanguage): Promise<number> {
        return await Language.updateOne(
            { _id: language._id },
            language
        );
    }

    async deleteOne(id: string): Promise<number> {
        return await Language.updateOne(
            { _id: new ObjectId(id) },
            { isDeleted: true }
        );
    }
}

export default LanguageRepo;
