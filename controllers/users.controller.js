import { isDateValidFormat, isNotNegativeInteger } from '../helpers/helpers.js';
import { handleError } from '../middleware/error-handler.middleware.js';
import { httpStatusCodes } from '../helpers/httpStatusCodes.js';
import { UserModel } from '../models/user.model.js';

const MAX_LOGS_DATE = '9999-12-31';
const MIN_LOGS_DATE = '0000-00-00';

export const getAllUsers = async (req, res) => {
	try {
		const data = await UserModel.getAllUsers();
		res.status(httpStatusCodes.OK).json({
			message: 'success',
			data,
		});
	} catch (err) {
		handleError(err, res);
	}
};

export const getUser = async (req, res) => {
	const params = req.params;
	const id = params._id;
	const idIsNumber = Number.isInteger(+id);

	if (idIsNumber) {
		try {
			const data = await UserModel.getUser(id);

			if (data) {
				res.status(httpStatusCodes.OK).json({
					message: 'success',
					data,
				});
			} else {
				const err = new Error(`User with id ${id} not found`);
				handleError(err, res, httpStatusCodes.NOT_FOUND);
			}
		} catch (err) {
			handleError(err, res);
		}
	} else {
		const err = new Error(`User id is ${id}, but it MUST be a number`);
		handleError(err, res, httpStatusCodes.BAD_REQUEST);
	}
};

export const createNewUser = async (req, res) => {
	const body = req.body;
	const user = body.username;

	if (user) {
		try {
			const data = await UserModel.createNewUser(user);

			res.status(httpStatusCodes.OK).json({
				message: 'success',
				data,
			});
		} catch (err) {
			if (err.code === 'SQLITE_CONSTRAINT') {
				err.message = `User with a name '${user}' already exists`;
			}

			handleError(err, res);
		}
	} else {
		const err = new Error("Required param 'username' is not provided");
		handleError(err, res, httpStatusCodes.BAD_REQUEST);
	}
};

export const getUserExercises = async (req, res) => {
	const params = req.params;
	const query = req.query;
	const id = params._id;
	let { from, to, limit } = query;

	if (!isNotNegativeInteger(limit)) {
		limit = -1;
	}

	if (!isDateValidFormat(from)) {
		console.log('from is in not valid format');
		from = MIN_LOGS_DATE;
	}

	if (!isDateValidFormat(to)) {
		console.log('to is in not valid format');
		to = MAX_LOGS_DATE;
	}

	try {
		const data = await UserModel.getUserExercisesLog(id, from, to, limit);

		res.status(httpStatusCodes.OK).json({
			message: 'success',
			data,
		});
	} catch (err) {
		handleError(err, res);
	}
};

export const createUserExercise = async (req, res) => {
	const params = req.params;
	const body = req.body;
	const userId = params._id;
	const idIsPositiveNumber = isNotNegativeInteger(userId);

	const description = body.description;
	const duration = body.duration;
	const durationIsPositiveNumber = isNotNegativeInteger(duration);
	const date = body.date || new Date().toISOString().split('T')[0];
	const dateIsValidFormat = isDateValidFormat(date);

	const errors = [];

	if (!dateIsValidFormat) {
		errors.push(`Provided date ${date}, is not in required format YYYY-MM-DD`);
	}

	if (!idIsPositiveNumber) {
		errors.push(`Provided user id is ${userId}, but it MUST be a positive number`);
	}

	if (!description) {
		errors.push("required field 'description' is missing");
	}

	if (!duration) {
		errors.push("required field 'duration' is missing");
	}

	if (duration && !durationIsPositiveNumber) {
		errors.push(`Provided field 'duration' has value ${duration}, but it MUST to be a positive number or 0`);
	}

	if (!errors.length) {
		try {
			const data = await UserModel.createNewExercise({
				userId,
				description,
				duration,
				date,
			});

			res.status(httpStatusCodes.OK).json({
				message: 'success',
				data,
			});
		} catch (err) {
			handleError(err, res);
		}
	} else {
		const err = new Error(errors.join(', '));
		handleError(err, res, httpStatusCodes.BAD_REQUEST);
	}
};
