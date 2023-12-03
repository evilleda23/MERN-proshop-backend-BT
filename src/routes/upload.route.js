import { Router } from 'express';

import asyncHandler from '../middleware/async-handler.js';

import { postUploadImageController } from '../controllers/upload.controller.js';

const router = Router();

router.post('/', asyncHandler(postUploadImageController));

export default router;
