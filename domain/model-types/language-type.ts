/**
 * Author: Nam Dinh
 * Created At: Wed Apr 13 2022
 * File name: language-type.ts
 */

import mongoose from 'mongoose';

/**
 * Define interface ILanguage
 */
export interface ILanguage {
    _id: mongoose.Types.ObjectId;
    name: string;
    description: string;
    slug: string;
    image: string;
    isDeleted: boolean;
}
