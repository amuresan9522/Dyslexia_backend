import express from 'express';

import { authorizedOnly } from '../../middlewares/authorizedOnly.middleware';
import { findUserById } from '../../repositories/user.repository';

const router = express.Router();

router.get('/', authorizedOnly, (req, res, next) => {
    return findUserById(req.userId)
        .then((response) => {
            res.json(response);
        })
        .catch(next);
});

export default router;
