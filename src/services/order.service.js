import { Order } from '../models/index.js';

export const findAllOrders = async () => {
  return await Order.find({}).populate('user', 'id name');
};

export const findMyOrders = async (user) => {
  return await Order.find({ user });
};

export const findOrderById = async (id) => {
  return await Order.findById(id).populate('user', 'name email');
};

export const createOrder = async ({ orderItems, user, ...body }) => {
  const order = new Order({
    orderItems,
    user,
    ...body,
  });
  return await order.save();
};

export const updateOrderById = async (id, body) => {
  return await Order.updateOne({ _id: id }, body);
};
