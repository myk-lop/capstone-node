import { httpStatusCodes } from '../helpers/httpStatusCodes.js';

export class ErrorHandler extends Error {
	constructor(statusCode, message) {
		super();
		this.statusCode = statusCode;
		this.message = message;
	}
}

export const handleError = (err, res, statusCode = httpStatusCodes.INTERNAL_SERVER) => {
	const { message = 'You reached a route that is not defined on this server' } = err;
	const errCode = err.statusCode || statusCode;

	res.status(errCode).json({
		success: 'false',
		// message: `Route ${res.req.url} with ${res.req.method} method is not found`,
		error: {
			statusCode: errCode,
			message,
		},
	});
};
