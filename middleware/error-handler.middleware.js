export class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

export const handleError = (err, res) => {
    const { statusCode = 500, message = 'You reached a route that is not defined on this server' } = err;
    res.status(statusCode).json({
        success: 'false',
        message: `Route ${res.req.url} with ${res.req.method} method is not found`,
        error: {
            statusCode,
            message,
        },
    });
};