import { StatusCodes } from 'http-status-codes';

import { HTTP_RESPONSE } from '../utils/http-response.util.js';
import { createUsers, removeAllUsers } from '../services/user.service.js';
import {
  createProducts,
  removeAllProducts,
} from '../services/product.service.js';

import defaultData from '../data/default.data.js';

import users from '../mock/users.mock.js';
import products from '../mock/products.mock.js';

// @desc    Insert seed data
// @route   POST /api/seed
// @access  Public
export const postInsertSeedDataController = async (req, res) => {
  try {
    await deleteAllData();

    const { admin } = await defaultData();

    //users
    await createUsers(users);

    await createProducts(products, admin._id);

    console.log('Seed data inserted successfully'.green.inverse);

    return HTTP_RESPONSE(
      res,
      StatusCodes.OK,
      'Seed data inserted successfully',
      null
    );
  } catch (error) {
    console.error(`${error.message}`.red.inverse);
    process.exit(1);
  }
};

// @desc    Delete all data
// @route   DELETE /api/seed
// @access  Public
export const deleteAllDataController = async (req, res) => {
  try {
    await deleteAllData();

    await defaultData();
    console.log('All data deleted successfully'.red.inverse);

    return HTTP_RESPONSE(
      res,
      StatusCodes.OK,
      'All data deleted successfully',
      null
    );
  } catch (error) {
    console.error(`${error.message}`.red.inverse);
    process.exit(1);
  }
};

const deleteAllData = async () => {
  await removeAllUsers();
  await removeAllProducts();
};
