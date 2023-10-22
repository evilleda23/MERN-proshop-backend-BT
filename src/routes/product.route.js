import Router from 'express';

import asyncHandler from '../middleware/async-handler.js';

import { getProduct, getProducts } from '../controllers/product.controller.js';

const router = Router();

router.get('/products', asyncHandler(getProducts));
router.get('/product/:id', asyncHandler(getProduct));

export default router;
