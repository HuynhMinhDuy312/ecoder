/**
 * Author: Nam Dinh
 * Created At: Wed Apr 13 2022
 * File name: language-model.ts
 */

import mongoose from 'mongoose';

import { ILanguage } from '@model-types';

/**
 * Define Schema
 */
const modelSchema = new mongoose.Schema<ILanguage>({
    name: String,
    description: String,
    slug: String,
    image: String,
    isDeleted: {type: Boolean, default: false},
});

/**
 * Define Model
 */
const Language = mongoose.model<ILanguage>('Language', modelSchema);

// Export default Model
export default Language;
