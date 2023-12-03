import Router from 'express';

import asyncHandler from '../middleware/async-handler.js';

import { protect, admin } from '../middleware/auth.js';

import {
  deleteProductController,
  getProductController,
  getProductsController,
  postProductController,
  putProductController,
} from '../controllers/product.controller.js';

const router = Router();

router.get('/', asyncHandler(getProductsController));
router.get('/:id', asyncHandler(getProductController));

router.post('/', [protect, admin], asyncHandler(postProductController));

router.put('/:id', [protect, admin], asyncHandler(putProductController));

router.delete('/:id', asyncHandler(deleteProductController));

export default router;
