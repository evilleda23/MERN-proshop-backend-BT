import { User } from '../models/index.js';

/**
 *
 * @param {string} email
 * @returns
 */

export const findUserById = async (id) => {
  return await User.findById(id).select('-password');
};

/**
 *
 * @param {string} email
 * @returns
 */

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

/**
 *
 * @param {uuid} id
 * @param {User} body
 * @returns User
 */
export const updateUser = async (id, body) => {
  return await User.updateOne({ _id: id }, body);
};

/**
 *
 * @param {User} body
 * @returns
 */
export const createUser = async (body) => {
  return await User.create(body);
};

export const createUsers = async (body) => {
  return await User.insertMany(body);
};

export const removeAllUsers = async () => {
  await User.deleteMany({});
};

/**
 * @typedef {Object} User
 * @property {string} name
 * @property {string} email
 * @property {string} password
 * @property {boolean} isAdmin
 */
