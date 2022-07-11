import express from 'express';
const router = express.Router();

// GET USERS
router.get('/', (req, res) => {
	console.log('GET users!');
	res.send('GET users!');
});

// CREATE NEW USER
router.post('/', (req, res) => {
	const body = req.body;
	console.log('Post users!', body);
	res.send(`Post users! ${JSON.stringify(body)}`);
});

// USER
router.post('/:_id', (req, res) => {
	const params = req.params;
	const id = params._id;

	console.log('Post user!');
	res.send(`Post user! ${id}`);
});

// USER EXERCISES
router.post('/:_id/exercises', (req, res) => {
	const params = req.params;
	const id = params._id;
	const body = req.body;

	console.log('Post user EXERCISES!', body);
	res.send(`Post user EXERCISES! ${JSON.stringify(body)}`);
});

// USER LOGS
router.get('/:_id/logs', (req, res) => {
	const query = req.query;
	const id = req.params._id;

	const from = query.from;
	const to = query.to;
	const limit = query.limit;

	if (from && to && limit) {
	}

	console.log('Get user logs!');
	console.log('query', query);
	res.send(`Get user logs query! ${JSON.stringify(query)}`);
});

export default router;
