import express from 'express';
import joi from 'joi';

import { authorizedOnly } from '../../../middlewares/authorizedOnly.middleware';
import { validateBodySchema } from '../../../middlewares/validation.middleware';

import { create } from '../../../repositories/userQuizActivity.repository';

const router = express.Router();

const schema = {
    resources: joi
        .string()
        .required(),
    points: joi
        .number()
        .required()
};

router.post('/', authorizedOnly,  validateBodySchema(schema), (req, res, next) => {
    return create(req.userId, req.body.resources, req.body.points)
        .then((response) => {
            res.json(response.toObject());
        })
        .catch(next);
});

export default router;
