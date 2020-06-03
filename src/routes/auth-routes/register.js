import express from 'express';
import joi from 'joi';

import { validateBodySchema } from '../../middlewares/validation.middleware';
import { registerUser } from '../../repositories/user.repository';

const router = express.Router();

const schema = {
    firstName: joi
        .string()
        .required()
        .min(3)
        .max(40),
    lastName: joi
        .string()
        .required()
        .min(3)
        .max(40),
    email: joi.string().required().email(),
    password: joi.string().required().min(8).max(20)

};

router.post('/register', validateBodySchema(schema), (req, res, next) => {
    return registerUser(req.body.firstName, req.body.lastName,req.body.email, req.body.password)
        .then((user) => res.json(user))
        .catch(next);
});

export default router;
