import express from 'express';
import joi from 'joi';

import { authorizedOnly } from '../../../middlewares/authorizedOnly.middleware';
import { validateBodySchema } from '../../../middlewares/validation.middleware';

import { create } from '../../../repositories/userGameActivity.repository';

const router = express.Router();

const schema = {
    start: joi
        .string()
        .required(),
    end: joi
        .string()
        .required(),
    words: joi
        .any()
        .required(),
    userInput: joi
        .any()
        .required()
};

router.post('/add', authorizedOnly,  validateBodySchema(schema), (req, res, next) => {
    return create(req.userId, req.body.start, req.body.end, req.body.words, req.body.userInput)
        .then((response) => {
            res.json(response.toObject());
        })
        .catch(next);
});

export default router;
