import Router from 'express';
import { getProduct, getProducts } from '../controllers/product.controller.js';

const router = Router();

router.get('/products', getProducts);
router.get('/product/:id', getProduct);

export default router;
