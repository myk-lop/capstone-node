import express from 'express';
const router = express.Router();

import usersRouter from './users.js';

// router.get('/', (req, res) => {
//     res.sendFile( path.join(path.join(__dirname + '/../../views/index.html')));
// });

router.use('/users', usersRouter);

// module.exports = router;
export default router;
