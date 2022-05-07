/**
 * Author: Nam Dinh
 * Created At: Wed Apr 13 2022
 * File name: build-status-repo.ts
 */

import { ObjectId } from 'mongodb';
import { HydratedDocument } from 'mongoose';
import { IBuildStatus } from '@model-types';
import { IBuildStatusRepo } from '@irepos';

import BuildStatus from '@models/build-status-model';

class BuildStatusRepo implements IBuildStatusRepo {
    async getAll(options: any): Promise<IBuildStatus[]> {
        throw new Error('Method not implemented.');
    }

    async getById(id: string): Promise<IBuildStatus | null> {
        throw new Error('Method not implemented.');
    }

    async addOne(buildStatus: IBuildStatus): Promise<IBuildStatus> {
        throw new Error('Method not implemented.');
    }

    async addMany(
        buildStatuses: IBuildStatus[]
    ): Promise<IBuildStatus[]> {
        return BuildStatus.insertMany(buildStatuses);
    }

    async updateOne(buildStatus: IBuildStatus): Promise<number> {
        throw new Error('Method not implemented.');
    }

    async deleteOne(id: string): Promise<number> {
        throw new Error('Method not implemented.');
    }
}

export default BuildStatusRepo;
