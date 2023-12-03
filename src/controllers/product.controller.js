import { StatusCodes } from 'http-status-codes';
import { HTTP_RESPONSE } from '../utils/http-response.util.js';

import {
  createProduct,
  findProductById,
  findProducts,
} from '../services/product.service.js';

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

//@desc    Create product
//@route   POST /api/products
//@access  Private/Admin
export async function postProductController(req, res) {
  const userId = req.user._id;
  const product = {
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    brand: req.body.brand,
    category: req.body.category,
    countInStock: req.body.countInStock,
    numReviews: req.body.numReviews,
    description: req.body.description,
  };

  const newProduct = await createProduct(product, userId);

  if (!product) {
    return HTTP_RESPONSE(res, StatusCodes.NOT_FOUND, 'Product not found', null);
  }

  return HTTP_RESPONSE(
    res,
    StatusCodes.OK,
    'Product fetched successfully',
    newProduct
  );
}
