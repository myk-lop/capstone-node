import 'dotenv/config.js';
import apiRouter from './routes/api/index.js';
import cors from 'cors';
import express from 'express';
import { fileURLToPath } from 'url';
import { handleError } from './middleware/error-handler.middleware.js';
import { httpStatusCodes } from './helpers/httpStatusCodes.js';
import indexRouter from './routes/index.js';
import { initAppDatabase } from './database/database.js';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

const app = express();

await initAppDatabase();

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
	res.status(httpStatusCodes.NOT_FOUND).json({
		success: 'false',
		message: `Route ${req.url} with ${req.method} method is not found`,
		error: {
			statusCode: httpStatusCodes.NOT_FOUND,
			message: 'You reached a route that is not defined on this server',
		},
	});
});

// THROW ErrorHandler
app.use((err, req, res) => {
	handleError(err, res);
});

const listener = app.listen(process.env.PORT || PORT, () => {
	console.log('Your app is listening on port ' + listener.address().port);
});
