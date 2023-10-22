import Router from 'express';

import asyncHandler from '../middleware/async-handler.js';

import {
  getProductController,
  getProductsController,
} from '../controllers/product.controller.js';

const router = Router();

router.get('/products', asyncHandler(getProductsController));
router.get('/product/:id', asyncHandler(getProductController));

export default router;
