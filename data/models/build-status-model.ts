/**
 * Author: Nam Dinh
 * Created At: Wed Apr 13 2022
 * File name: build-status-model.ts
 */

import mongoose from 'mongoose';

import { IBuildStatus } from '@model-types';

/**
 * Define Schema
 */
const buildStatusSchema = new mongoose.Schema<IBuildStatus>({
    _id: String,
    description: String,
});

/**
 * Define Model
 */
const BuildStatus = mongoose.model<IBuildStatus>(
    'BuildStatus',
    buildStatusSchema
);

// Export default Model
export default BuildStatus;
