/**
 * Author: Nam Dinh
 * Created At: Wed Apr 13 2022
 * File name: build-status-repo.ts
 */

import { IBuildStatus } from '@model-types';

export interface IBuildStatusRepo {
    getAll(options?: any): Promise<IBuildStatus[]>;
    getById(id: string): Promise<IBuildStatus | null>;
    addOne(buildStatus: IBuildStatus): Promise<IBuildStatus>;
    addMany(buildStatuses: IBuildStatus[]): Promise<IBuildStatus[]>;
    updateOne(buildStatus: IBuildStatus): Promise<number>;
    deleteOne(id: string): Promise<number>;
}
