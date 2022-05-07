import { IUser } from '@model-types';
import unitOfWork from '@repos/unit-of-work';

class UserService {
    getAll = async (): Promise<IUser[]> => {
        return await unitOfWork.userRepo.getAll();
    };

    getById = async (user: any): Promise<any> => {
        if (!user) return { error: 'Người dùng không tồn tại' };

        user.password = undefined;
        let result = { ...user };

        if (user.role === 'student') {
            const student = await unitOfWork.studentRepo.getById(
                user._id as string
            );

            if (!student) return { error: 'Sinh viên không tồn tại' };

            result = {
                user: {
                    ...user,
                    ...student,
                },
            };
        }
        return result;
    };
}

export default new UserService();
