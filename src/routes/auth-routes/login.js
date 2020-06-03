import express from 'express';
import joi from 'joi';

import { authenticateUser } from '../../repositories/user.repository';
import { validateBodySchema } from '../../middlewares/validation.middleware';

const router = express.Router();

const schema = {
    email: joi.string().required().email(),
    password: joi.string().required()
};

router.post('/login', validateBodySchema(schema), (req, res, next) => {
    return authenticateUser(req.body.email, req.body.password)
        .then((result) => res.json(result))
        .catch(next);
});
export default router;
