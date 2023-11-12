import Router from 'express';

import asyncHandler from '../middleware/async-handler.js';

import { protect, admin } from '../middleware/auth.js';

import {
  getAllOrdersController,
  getMyOrdersController,
  getOrderByIdController,
  putOrderToDeliveredController,
  putOrderToPaidController,
  postCreateOrderController,
} from '../controllers/order.controller.js';

const router = Router();

/* PRIVATE */
router.get('/', [protect, admin], asyncHandler(getAllOrdersController));
router.get('/myorders', protect, asyncHandler(getMyOrdersController));
router.get('/:id', protect, asyncHandler(getOrderByIdController));

router.put('/:id/pay', [protect], asyncHandler(putOrderToPaidController));
router.put(
  '/:id/deliver',
  [protect, admin],
  asyncHandler(putOrderToDeliveredController)
);

router.post('/', [protect], asyncHandler(postCreateOrderController));

export default router;
