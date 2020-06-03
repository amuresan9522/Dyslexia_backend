import express from 'express';

import getActivity from './get-activity';
import recordActivity from './record-activity';

const router = express.Router();

router.use(getActivity);
router.use(recordActivity);

export default router;
