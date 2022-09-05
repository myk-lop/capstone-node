import Database from 'sqlite-async';
import { ErrorHandler } from '../middleware/error-handler.middleware.js';
import { fileURLToPath } from 'url';
import { httpStatusCodes } from '../helpers/httpStatusCodes.js';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'app.db');

console.log(DB_PATH);

export const DB = await Database.open(DB_PATH);

export const initAppDatabase = async () => {
	const usersTable =
		'CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL UNIQUE)';
	const exercisesTable =
		'CREATE TABLE IF NOT EXISTS exercises(exerciseId INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER NOT NULL, description TEXT NOT NULL, duration INTEGER NOT NULL, date TEXT NOT NULL, FOREIGN KEY (userId) REFERENCES users(id))';

	try {
		await DB.run(usersTable);
		await DB.run(exercisesTable);
	} catch (err) {
		console.error(err);
		throw new ErrorHandler(httpStatusCodes.INTERNAL_SERVER, 'Error connecting to database');
	}
};
