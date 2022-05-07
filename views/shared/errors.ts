import HttpStatusCodes from 'http-status-codes';

export abstract class CustomError extends Error {
    public readonly HttpStatus = HttpStatusCodes.BAD_REQUEST;

    constructor(msg: string, httpStatus: number) {
        super(msg);
        this.HttpStatus = httpStatus;
    }
}

export class ParamMissingError extends CustomError {
    public static readonly Msg =
        'Dữ liệu đầu vào không hợp lệ. Vui lòng kiểm tra lại.';
    public static readonly HttpStatus = HttpStatusCodes.BAD_REQUEST;

    constructor() {
        super(ParamMissingError.Msg, ParamMissingError.HttpStatus);
    }
}

export class UserNotFoundError extends CustomError {
    public static readonly Msg = 'Người dùng không tồn tại.';
    public static readonly HttpStatus = HttpStatusCodes.NOT_FOUND;

    constructor() {
        super(UserNotFoundError.Msg, UserNotFoundError.HttpStatus);
    }
}

export class DatabaseConnectionError extends CustomError {
    public static readonly Msg =
        'Xin lỗi! Không thể lấy dữ liệu từ server. Vui lòng thử lại sau.';
    public static readonly HttpStatus =
        HttpStatusCodes.INTERNAL_SERVER_ERROR;

    constructor() {
        super(
            DatabaseConnectionError.Msg,
            DatabaseConnectionError.HttpStatus
        );
    }
}

export class ServerError extends CustomError {
    public static readonly Msg =
        'Xin lỗi! Server hiện tại đang bận. Vui lòng thử lại sau.';
    public static readonly HttpStatus =
        HttpStatusCodes.INTERNAL_SERVER_ERROR;

    constructor() {
        super(ServerError.Msg, ServerError.HttpStatus);
    }
}

export class AuthenticationFailedError extends CustomError {
    public static readonly Msg =
        'Tên đăng nhập hoặc mật khẩu không chính xác';
    public static readonly HttpStatus =
        HttpStatusCodes.NON_AUTHORITATIVE_INFORMATION;

    constructor() {
        super(AuthenticationFailedError.Msg, AuthenticationFailedError.HttpStatus);
    }
}

export class UnauthorizedError extends CustomError {
    public static readonly Msg =
        'Bạn không có quyền thực hiện điều này';
    public static readonly HttpStatus = HttpStatusCodes.UNAUTHORIZED;

    constructor() {
        super(UnauthorizedError.Msg, UnauthorizedError.HttpStatus);
    }
}

export class DuplicateUserError extends CustomError {
    public static readonly Msg = 'Tên đăng nhập đã tồn tại!';
    public static readonly HttpStatus =
        HttpStatusCodes.NON_AUTHORITATIVE_INFORMATION;

    constructor() {
        super(DuplicateUserError.Msg, DuplicateUserError.HttpStatus);
    }
}

export class NotEnoughAgeError extends CustomError {
    public static readonly Msg = 'Học viên phải trên 7 tuổi!';
    public static readonly HttpStatus =
        HttpStatusCodes.NON_AUTHORITATIVE_INFORMATION;

    constructor() {
        super(NotEnoughAgeError.Msg, NotEnoughAgeError.HttpStatus);
    }
}
