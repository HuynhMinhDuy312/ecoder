/**
 * Author: Nam Dinh
 * Created At: Wed Apr 13 2022
 * File name: build-status-service.ts
 */

import { IBuildStatus } from '@model-types';
import BuildStatus from '@models/build-status-model';
import unitOfWork from '@repos/unit-of-work';

class BuildStatusService {
    getAll = async (): Promise<IBuildStatus[]> => {
        return await unitOfWork.buildStatusRepo.getAll();
    };

    getById = async (id: string): Promise<IBuildStatus | null> => {
        return await unitOfWork.buildStatusRepo.getById(id);
    };

    addOne = async (objBuildStatus: any): Promise<IBuildStatus> => {
        const buildStatus: IBuildStatus = new BuildStatus(
            objBuildStatus
        );

        return await unitOfWork.buildStatusRepo.addOne(buildStatus);
    };

    addMany = async (
        objBuildStatuses: any[]
    ): Promise<IBuildStatus[]> => {
        const buildStatuses = objBuildStatuses.map(
            (objBuildStatus) =>
                new BuildStatus(objBuildStatus) as IBuildStatus
        );

        return await unitOfWork.buildStatusRepo.addMany(
            buildStatuses
        );
    };

    updateOne = async (objBuildStatus: any): Promise<number> => {
        const buildStatus: IBuildStatus = new BuildStatus(
            objBuildStatus
        );

        return await unitOfWork.buildStatusRepo.updateOne(
            buildStatus
        );
    };

    deleteOne = async (id: string): Promise<number> => {
        return await unitOfWork.buildStatusRepo.deleteOne(id);
    };
}

export default new BuildStatusService();
