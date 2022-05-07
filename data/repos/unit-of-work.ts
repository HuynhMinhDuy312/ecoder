import mongoose from 'mongoose';

import {
    IUserRepo,
    IRoleRepo,
    IStudentRepo,
    ILanguageRepo,
    IBuildStatusRepo,
    ICourseRepo,
    ICourseLevelRepo,
    ILessonRepo,
    IChapterRepo,
    ICourseReviewRepo,
    IStudentCourseRepo,
    ILessonNoteRepo,
    ICourseCommentRepo,
} from '@irepos';

import repositories from '@repos';

class UnitOfWork {
    private _userRepo?: IUserRepo;
    private _roleRepo?: IRoleRepo;
    private _studentRepo?: IStudentRepo;
    private _languageRepo?: ILanguageRepo;
    private _courseRepo?: ICourseRepo;
    private _buildStatusRepo?: IBuildStatusRepo;
    private _courseLevelRepo?: ICourseLevelRepo;
    private _lessonRepo?: ILessonRepo;
    private _chapterRepo?: IChapterRepo;
    private _courseReviewRepo?: ICourseReviewRepo;
    private _studentCourseRepo?: IStudentCourseRepo;
    private _lessonNoteRepo?: ILessonNoteRepo;
    private _courseCommentRepo?: ICourseCommentRepo;

    get userRepo() {
        if (!this._userRepo) {
            this._userRepo = new repositories.UserRepo();
        }
        return this._userRepo as IUserRepo;
    }

    get roleRepo() {
        if (!this._roleRepo) {
            this._roleRepo = new repositories.RoleRepo();
        }
        return this._roleRepo as IRoleRepo;
    }

    get studentRepo() {
        if (!this._studentRepo) {
            this._studentRepo = new repositories.StudentRepo();
        }
        return this._studentRepo as IStudentRepo;
    }

    get languageRepo() {
        if (!this._languageRepo) {
            this._languageRepo = new repositories.LanguageRepo();
        }
        return this._languageRepo as ILanguageRepo;
    }

    get courseRepo() {
        if (!this._courseRepo) {
            this._courseRepo = new repositories.CourseRepo();
        }
        return this._courseRepo as ICourseRepo;
    }

    get buildStatusRepo() {
        if (!this._buildStatusRepo) {
            this._buildStatusRepo =
                new repositories.BuildStatusRepo();
        }

        return this._buildStatusRepo as IBuildStatusRepo;
    }

    get courseLevelRepo() {
        if (!this._courseLevelRepo) {
            this._courseLevelRepo =
                new repositories.CourseLevelRepo();
        }
        return this._courseLevelRepo as ICourseLevelRepo;
    }

    get lessonRepo() {
        if (!this._lessonRepo) {
            this._lessonRepo = new repositories.LessonRepo();
        }
        return this._lessonRepo as ILessonRepo;
    }

    get chapterRepo() {
        if (!this._chapterRepo) {
            this._chapterRepo = new repositories.ChapterRepo();
        }
        return this._chapterRepo as IChapterRepo;
    }

    get courseReviewRepo() {
        if (!this._courseReviewRepo) {
            this._courseReviewRepo =
                new repositories.CourseReviewRepo();
        }
        return this._courseReviewRepo as ICourseReviewRepo;
    }

    get studentCourseRepo() {
        if (!this._studentCourseRepo) {
            this._studentCourseRepo =
                new repositories.StudentCourseRepo();
        }

        return this._studentCourseRepo as IStudentCourseRepo;
    }

    get lessonNoteRepo() {
        if (!this._lessonNoteRepo) {
            this._lessonNoteRepo = new repositories.LessonNoteRepo();
        }

        return this._lessonNoteRepo as ILessonNoteRepo;
    }

    get courseCommentRepo() {
        if (!this._courseCommentRepo) {
            this._courseCommentRepo = new repositories.CourseCommentRepo();
        }

        return this._courseCommentRepo as ICourseCommentRepo;
    }

    runTransaction = async (callBack: Awaited<Function>) => {
        const session = await mongoose.startSession();
        let result = null;

        await session.withTransaction(async () => {
            result = await callBack();
            return result;
        });
        await session.endSession();
        return result;
    };
}

export default new UnitOfWork();
