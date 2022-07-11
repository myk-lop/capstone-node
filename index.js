// const express = require('express');
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import Database from 'sqlite-async';
import 'dotenv/config.js';
import createError from 'http-errors';
import indexRouter from './routes/index.js';
import apiRouter from './routes/api/index.js';

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

// 404
// app.use((req, res, next) => {
//   res.status(404).send("Sorry can't find that!")
// });
// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

const listener = app.listen(process.env.PORT || PORT, () => {
	console.log('Your app is listening on port ' + listener.address().port);
});
