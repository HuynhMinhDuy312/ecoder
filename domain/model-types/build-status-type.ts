/**
 * Author: Nam Dinh
 * Created At: Wed Apr 13 2022
 * File name: build-status-type.ts
 */

import mongoose from 'mongoose';

/**
 * Define interface IBuildStatus
 */
export interface IBuildStatus {
    _id: string; // completed: Hoàn thành, in-progress: Đang tiến hành, deleted: Đã xóa
    description: string; // Short description
}
