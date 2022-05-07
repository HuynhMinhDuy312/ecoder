/**
 * Author: Nam Dinh
 * Created At: Thu Apr 07 2022
 * File name: role-model.ts
 */

import mongoose from 'mongoose';
import { IRole } from '@model-types';

/**
 * Define Schema
 */
const roleSchema = new mongoose.Schema<IRole>({
    _id: String,
    name: String,
});

/**
 * Define Model
 */
const Role = mongoose.model<IRole>('Role', roleSchema);

// Export default Model
export default Role;
