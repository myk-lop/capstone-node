import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import Database from 'sqlite-async';
import 'dotenv/config.js';
import indexRouter from './routes/index.js';
import apiRouter from './routes/api/index.js';
import {handleError} from './middleware/error-handler.middleware.js';

const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'app.db');

const app = express();

await Database.open(DB_PATH);

app.use(cors());

// For parsing application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/api', apiRouter);

// NOT FOUND GLOBAL HANDLER
app.use((req, res) => {
	res.status(404).json({
		success: 'false',
		message: `Route ${req.url} with ${req.method} method is not found`,
		error: {
			statusCode: 404,
			message: 'You reached a route that is not defined on this server',
		},
	});
});

// THROW ErrorHandler
app.use((err, req, res, next) => {
	handleError(err, res);
});

const listener = app.listen(process.env.PORT || PORT, () => {
	console.log('Your app is listening on port ' + listener.address().port);
});
