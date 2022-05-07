/**
 * Author: Nam Dinh
 * Created At: Wed Apr 13 2022
 * File name: language-repo.ts
 */

import { ILanguage } from '@model-types';

export interface ILanguageRepo {
    getAll(options: any): Promise<ILanguage[]>;
    getById(id: string): Promise<ILanguage | null>;
    getBySlug(slug: string): Promise<ILanguage | null>;
    addOne(iLanguage: ILanguage): Promise<ILanguage>;
    addMany(iLanguages: ILanguage[]): Promise<ILanguage[]>;
    updateOne(iLanguage: ILanguage): Promise<number>;
    deleteOne(id: string): Promise<number>;
}
