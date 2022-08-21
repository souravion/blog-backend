class AppError extends Error {
    constructor(message, statusCode, errorCode) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

ERROR = {
    BadRequest:400,
    Unauthorized:401,
    Forbidden:403,	
    NotFound:404,
    MethodNotAllowed:405,
    Conflict:409,
    InternalServerError:500
    	
}

ERRORCODE = {
    AuthErrorCode:"auth/invalid-credential",
    InternalServerError:'auth/internal-error'
}

module.exports = {
    AppError,
    ERROR,
    ERRORCODE
};