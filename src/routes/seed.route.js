import { Router } from 'express';

import asyncHandler from '../middleware/async-handler.js';

import {
  deleteAllDataController,
  postInsertSeedDataController,
} from '../controllers/seed.controller.js';

const router = Router();

router.post('/', asyncHandler(postInsertSeedDataController));

router.delete('/', asyncHandler(deleteAllDataController));

export default router;
