import Router from 'express';
import { getProduct, getProducts } from '../controllers/product.controller.js';

import asyncHandler from '../middleware/asyncHandler.js';

const router = Router();

router.get('/products', asyncHandler(getProducts));
router.get('/product/:id', asyncHandler(getProduct));

export default router;
