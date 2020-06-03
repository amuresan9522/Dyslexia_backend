import express from 'express';

import register from './register';
import login from './login';

const router = express.Router();

router.use(register);
router.use(login);

export default router;
