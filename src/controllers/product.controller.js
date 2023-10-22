import { StatusCodes } from 'http-status-codes';
import { HTTP_RESPONSE } from '../utils/http-response.utils.js';

import { findProductById, findProducts } from '../services/product.service.js';

export async function getProducts(req, res) {
  const products = await findProducts();
  return HTTP_RESPONSE(
    res,
    StatusCodes.OK,
    'All products fetched successfully',
    products
  );
}

export async function getProduct(req, res) {
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
