import { StatusCodes } from 'http-status-codes';
import { HTTP_RESPONSE } from '../utils/http-response.util.js';

import {
  createOrder,
  findAllOrders,
  findMyOrders,
  findOrderById,
  updateOrderById,
} from '../services/order.service.js';

//@desc    Get All orders
//@route   GET /api/orders
//@access  Private/Admin
export async function getAllOrdersController(req, res) {
  const orders = await findAllOrders();
  return HTTP_RESPONSE(res, StatusCodes.OK, 'My Orders', orders);
}

//@desc    Get logged in user orders
//@route   GET /api/orders/myorders
//@access  Private
export async function getMyOrdersController(req, res) {
  const orders = await findMyOrders(req.user._id);

  return HTTP_RESPONSE(res, StatusCodes.OK, 'My Orders', orders);
}

//@desc    Get orders by id
//@route   GET /api/orders/:id
//@access  Private
export async function getOrderByIdController(req, res) {
  const order = await findOrderById(req.params.id);

  if (!order)
    return HTTP_RESPONSE(res, StatusCodes.NOT_FOUND, 'Order not found');

  return HTTP_RESPONSE(res, StatusCodes.OK, 'Get Order by id', order);
}

//@desc    Update order to paid
//@route   PUT /api/orders/:id/pay
//@access  Private
export async function putOrderToPaidController(req, res) {
  const { id: orderId } = req.params;
  const { id, status, update_time, payer } = req.body;

  const order = await findOrderById(orderId);

  if (!order)
    return HTTP_RESPONSE(res, StatusCodes.NOT_FOUND, 'Order not found');

  const body = {
    isPaid: true,
    paidAt: Date.now(),
    paymentResult: {
      id,
      status,
      update_time,
      email_address: payer.email_address,
    },
  };
  const updatedOrder = await updateOrderById(orderId, body);
  return HTTP_RESPONSE(
    res,
    StatusCodes.OK,
    'Update order to paid',
    updatedOrder
  );
}

//@desc    Update order to paid
//@route   PUT /api/orders/:id/deliver
//@access  Private/Admin
export async function putOrderToDeliveredController(req, res) {
  const { id: orderId } = req.params;
  const order = await findOrderById(orderId);
  if (!order)
    return HTTP_RESPONSE(res, StatusCodes.NOT_FOUND, 'Order not found');

  await updateOrderById(orderId, {
    isDelivered: true,
    deliveredAt: Date.now(),
  });
  return HTTP_RESPONSE(res, StatusCodes.OK, 'Update order to delivered', order);
}

//@desc    Create new order
//@route   POST /api/orders
//@access  Private
export async function postCreateOrderController(req, res) {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0)
    return HTTP_RESPONSE(res, StatusCodes.BAD_REQUEST, 'No order items');
  const userId = req.user._id;
  const createdOrder = await createOrder({
    orderItems: orderItems.map((item) => ({
      ...item,
      product: item._id,
      _id: undefined,
    })),
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user: userId,
  });

  return HTTP_RESPONSE(res, StatusCodes.CREATED, 'Order Items', createdOrder);
}
