import LanguageController from './language-controller';
import CourseController from './course-controller';
import UserController from './user-controller';
import StudentController from './student-controller';

class ControllerFactory {
    constructor() {
        this.controllers = {
            language: new LanguageController(),
            course: new CourseController(),
            user: new UserController(),
            student: new StudentController(),
        };
    }

    get language() {
        return this.controllers['language'];
    }

    get course() {
        return this.controllers['course'];
    }

    get user() {
        return this.controllers['user'];
    }

    get student() {
        return this.controllers['student'];
    }
}

export default new ControllerFactory();
