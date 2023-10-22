import Router from 'express';

import asyncHandler from '../middleware/async-handler.js';

import {
  getProductController,
  getProductsController,
} from '../controllers/product.controller.js';

const router = Router();

router.get('/', asyncHandler(getProductsController));
router.get('/:id', asyncHandler(getProductController));

export default router;
