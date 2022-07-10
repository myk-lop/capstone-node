const express = require('express');
const app = express();
const cors = require('cors');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const path = require('path');

const PORT = 3000;

require('dotenv').config();

app.use(cors());

// For parsing application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/api', apiRouter);


const listener = app.listen(process.env.PORT || PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});