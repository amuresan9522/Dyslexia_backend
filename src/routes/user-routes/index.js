import express from 'express';

import getUser from './get-user';
import updateUser from './update-user';

import userQuizActivity from './quizActivity';
import userGameActivity from './gameActivity';

const router = express.Router();

router.use(getUser);
router.use(updateUser);

router.use('/activity/quiz', userQuizActivity);
router.use('/activity/game', userGameActivity);

export default router;
