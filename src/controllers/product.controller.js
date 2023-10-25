import { StatusCodes } from 'http-status-codes';
import { HTTP_RESPONSE } from '../utils/http-response.util.js';

import { findProductById, findProducts } from '../services/product.service.js';

//@desc    Get all products
//@route   GET /api/products
//@access  Public
export async function getProductsController(req, res) {
  const products = await findProducts();
  return HTTP_RESPONSE(
    res,
    StatusCodes.OK,
    'All products fetched successfully',
    products
  );
}

//@desc    Get a product by id
//@route   GET /api/products/:id
//@access  Public
export async function getProductController(req, res) {
  const product = await findProductById(req.params.id);

  if (!product) {
    return HTTP_RESPONSE(res, StatusCodes.NOT_FOUND, 'Product not found', null);
  }

  return HTTP_RESPONSE(
    res,
    StatusCodes.OK,
    'Product fetched successfully',
    product
  );
}
