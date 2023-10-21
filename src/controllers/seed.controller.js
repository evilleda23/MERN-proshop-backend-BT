import { StatusCodes } from 'http-status-codes';

import { HTTP_RESPONSE } from '../utils/http-response.utils.js';
import { createUsers, removeAllUsers } from '../services/user.service.js';

import defaultData from '../data/default.data.js';
import users from '../mock/users.mock.js';

export const postInsertSeedDataController = async (req, res) => {
  try {
    await deleteAllData();

    await defaultData();

    //users
    await createUsers(users);

    return HTTP_RESPONSE(
      res,
      StatusCodes.OK,
      'Seed data inserted successfully',
      null
    );
  } catch (error) {
    console.error(error);
    return HTTP_RESPONSE(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      error.message,
      null
    );
  }
};

const deleteAllData = async () => {
  await removeAllUsers();
};
