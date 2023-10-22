import { Router } from 'express';

import asyncHandler from '../middleware/async-handler.js';

import {
  deleteAllDataController,
  postInsertSeedDataController,
} from '../controllers/seed.controller.js';

const router = Router();

router.post('/seed/insertData', asyncHandler(postInsertSeedDataController));

router.delete('/seed/deleteData', asyncHandler(deleteAllDataController));

export default router;
