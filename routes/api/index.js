const express = require('express');
const router = express.Router();

const usersRouter = require('./users');

// router.get('/', (req, res) => {
//     res.sendFile( path.join(path.join(__dirname + '/../../views/index.html')));
// });

router.use('/users', usersRouter);

module.exports = router;