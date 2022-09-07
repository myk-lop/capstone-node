import { DB } from '../database/database.js';
import { ErrorHandler } from '../middleware/error-handler.middleware.js';
import { httpStatusCodes } from '../helpers/httpStatusCodes.js';

export class UserModel {
	static async getAllUsers() {
		const sql = 'select * from users';

		return await DB.all(sql);
	}

	static async getUser(userId) {
		const sql = 'select * from users where id = ?';

		return await DB.get(sql, userId);
	}

	static async createNewUser(name) {
		const sqlInsert = 'INSERT INTO users (username) VALUES (?)';
		const sqlGet = 'select * from users where id = ?';

		const { lastID } = await DB.run(sqlInsert, name);

		return await DB.get(sqlGet, lastID);
	}

	static async getUserExercisesLog(userId, from, to, limit = -1) {
		await this.throwErrorIfUserNotExist(userId);

		const sql = 'select * from exercises where userId = ? and date(date) BETWEEN ? AND ? ORDER BY date ASC LIMIT ?';
		const countSql = 'select count(*) from exercises where userId = ? and date(date) BETWEEN ? AND ?';

		const logs = await DB.all(sql, userId, from, to, limit);
		const countData = await DB.all(countSql, userId, from, to);
		const count = countData[0]['count(*)'];

		return { logs, count };
	}

	static async createNewExercise({ userId, description, duration, date }) {
		await this.throwErrorIfUserNotExist(userId);

		const sqlInsert = 'INSERT INTO exercises(userId, description, duration, date) VALUES(?, ?, ?, ?)';
		const sqlGet = 'select * from exercises where exerciseId = ?';

		const { lastID } = await DB.run(sqlInsert, [userId, description, duration, date]);

		return await DB.get(sqlGet, lastID);
	}

	static async throwErrorIfUserNotExist(userId) {
		const userExists = await this.getUser(userId);
		if (!userExists) {
			throw new ErrorHandler(httpStatusCodes.NOT_FOUND, `User with provided id ${userId} does not exists`);
		}
	}
}
