import express from 'express';

import { authorizedOnly } from '../../../middlewares/authorizedOnly.middleware';
import { getUserActivities } from '../../../repositories/userQuizActivity.repository';

const router = express.Router();

router.get('/', authorizedOnly, (req, res, next) => {
    return getUserActivities(req.userId)
        .then((response) => {
            res.json(response.toObject());
        })
        .catch(next);
});

export default router;
