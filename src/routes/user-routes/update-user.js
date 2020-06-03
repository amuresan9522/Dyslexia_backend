import express from 'express';
import joi from 'joi';

import { updateUser } from '../../repositories/user.repository';

import { authorizedOnly } from '../../middlewares/authorizedOnly.middleware';
import { validateBodySchema } from '../../middlewares/validation.middleware';

const schema = {
    username: joi
        .string()
        .required()
        .min(3)
        .max(40),
    email: joi.string().required().email()
};

const router = express.Router();

router.put('/' , validateBodySchema(schema), authorizedOnly, (req, res, next) => {
    return updateUser(req.userId, req.body.username, req.body.email)
        .then((user) => res.json(user.toObject()))
        .catch(next);
});

export default router;
