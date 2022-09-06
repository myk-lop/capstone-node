import {
	createNewUser,
	createUserExercise,
	getAllUsers,
	getUser,
	getUserExercises,
} from '../../controllers/users.controller.js';
import express from 'express';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:_id', getUser);
router.post('/', createNewUser);

// USER EXERCISES
router.post('/:_id?/exercises', createUserExercise);

// USER LOGS
router.get('/:_id/logs', getUserExercises);

export default router;
