/**
 * Author: Nam Dinh
 * Created At: Thu Apr 07 2022
 * File name: student-model.ts.ts
 */

import mongoose from 'mongoose';
import mongooseLeanVirtual from 'mongoose-lean-virtuals';
// import mongooseLeanGetter from 'mongoose-lean-getters';

import { IStudent } from '@model-types';

/**
 * Define student schema
 */
const studentSchema = new mongoose.Schema<IStudent>({
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    firstName: String,
    lastName: String,
    dob: Number,
    facebook: String,
    google: String,
    savedCourses: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    ],
    favoriteCourses: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    ],
});

// Add new key fullName to studentSchema (not exist in database)
studentSchema.virtual('fullName').get(function (this: IStudent) {
    return `${this.firstName} ${this.lastName}`;
});
studentSchema.plugin(mongooseLeanVirtual);
// studentSchema.plugin(mongooseLeanGetter);

/**
 * Define Student Model
 */
const Student = mongoose.model<IStudent>('Student', studentSchema);

// Export default Student Model
export default Student;

// Export interface
export { IStudent };
