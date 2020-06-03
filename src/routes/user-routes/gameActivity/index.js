import express from 'express';

import getActivity from './get-activity';
import recordActivity from './record-activity';
import add from './add';

const router = express.Router();

router.use(getActivity);
router.use(add);
router.use(recordActivity);

export default router;
