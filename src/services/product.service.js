import { Product } from '../models/index.js';

export const findProducts = async () => {
  return await Product.find({});
};
export const findProductById = async (id) => {
  return await Product.findById(id);
};

export const createProduct = async (product, userId) => {
  return await Product.create({ ...product, user: userId });
};

export const createProducts = async (products, userId) => {
  return await Product.insertMany(
    products.map((product) => ({ ...product, user: userId }))
  );
};

export const removeAllProducts = async () => {
  await Product.deleteMany({});
};
