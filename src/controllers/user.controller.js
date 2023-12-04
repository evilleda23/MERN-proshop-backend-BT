import { StatusCodes } from 'http-status-codes';
import { HTTP_RESPONSE } from '../utils/http-response.util.js';

import { generateToken } from '../utils/jwt.util.js';
import {
  createUser,
  findAllUsers,
  findUserByEmail,
  findUserById,
  removeUserById,
  updateUser,
  updateUserById,
} from '../services/user.service.js';

/* PUBLIC */

//@desc    Auth user & get token
//@route   POST /api/users/login
//@access  Public
export async function postAuthUserController(req, res) {
  const { email, password } = req.body;

  const userDB = await findUserByEmail(email);

  if (userDB && (await userDB.matchPassword(password))) {
    generateToken(res, { userId: userDB._id });

    const user = {
      id: userDB._id,
      name: userDB.name,
      email: userDB.email,
      isAdmin: userDB.isAdmin,
    };

    return HTTP_RESPONSE(res, StatusCodes.OK, 'Login Succesfully', user);
  }

  return HTTP_RESPONSE(
    res,
    StatusCodes.UNAUTHORIZED,
    'Invalid credentials',
    null
  );
}

//@desc    Register user
//@route   POST /api/users/register
//@access  Public
export async function postRegisterUserController(req, res) {
  const { name, email, password } = req.body;
  const userExists = await findUserByEmail(email);
  if (userExists)
    return HTTP_RESPONSE(
      res,
      StatusCodes.BAD_REQUEST,
      'User already exists',
      null
    );
  const user = await createUser({ name, email, password });

  if (!user)
    return HTTP_RESPONSE(
      res,
      StatusCodes.BAD_REQUEST,
      'Invalid user data',
      null
    );
  generateToken(res, { userId: user._id });
  return HTTP_RESPONSE(res, StatusCodes.OK, 'Register User', user);
}

/* PRIVATE */

//@desc    Get user
//@route   GET /api/users/:id
//@access  Private/Admin
export async function getUserByIdController(req, res) {
  const user = await findUserById(req.params.id);
  return HTTP_RESPONSE(res, StatusCodes.OK, 'Get Users', user);
}

//@desc    Get users
//@route   GET /api/users
//@access  Private/Admin
export async function getUsersController(req, res) {
  const users = await findAllUsers();
  return HTTP_RESPONSE(res, StatusCodes.OK, 'Get Users', users);
}

//@desc    Get user profile
//@route   GET /api/users/profile
//@access  Private
export async function getUserProfileController(req, res) {
  const user = await findUserById(req.user._id);
  if (!user) {
    return HTTP_RESPONSE(res, StatusCodes.NOT_FOUND, 'User not found', null);
  }
  return HTTP_RESPONSE(res, StatusCodes.OK, 'Get User Profile', user);
}

//@desc    Update user
//@route   PUT /api/users/:id
//@access  Private/Admin
export async function putUserByIdController(req, res) {
  const userId = req.params.id;
  const user = await findUserById(userId);
  if (!user) {
    return HTTP_RESPONSE(res, StatusCodes.NOT_FOUND, 'User not found', null);
  }
  const { name, email, isAdmin } = req.body;
  const newBody = {
    name: name || user.name,
    email: email || user.email,
    isAdmin: isAdmin || user.isAdmin,
  };
  await updateUserById(userId, newBody);
  return HTTP_RESPONSE(
    res,
    StatusCodes.NO_CONTENT,
    'User updated succesfully',
    null
  );
}

//@desc    Update user profile
//@route   PUT /api/users/profile
//@access  Private
export async function putUserProfileController(req, res) {
  const user = await findUserById(req.user._id);
  if (!user) {
    return HTTP_RESPONSE(res, StatusCodes.NOT_FOUND, 'User not found', null);
  }

  const { name, email, password } = req.body;

  const body = {
    name: name || user.name,
    email: email || user.email,
  };

  if (password) body.password = password;

  const updatedUser = await updateUser(user, body);
  return HTTP_RESPONSE(res, StatusCodes.OK, 'Update User Profile', updatedUser);
}

//@desc    Logout user /clear cookie
//@route   POST /api/users/logout
//@access  Private
export async function postLogoutUserController(req, res) {
  res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
  return HTTP_RESPONSE(res, StatusCodes.OK, 'Logged out succesfully', null);
}

//@desc    Delete user
//@route   DELETE /api/users/:id
//@access  Private/Admin
export async function deleteUserController(req, res) {
  const userId = req.params.id;
  const user = await findUserById(userId);
  if (!user) {
    return HTTP_RESPONSE(res, StatusCodes.NOT_FOUND, 'User not found', null);
  }
  if (user.isAdmin) {
    return HTTP_RESPONSE(
      res,
      StatusCodes.BAD_REQUEST,
      'Admin user cannot be deleted',
      null
    );
  }
  await removeUserById(userId);
  return HTTP_RESPONSE(res, StatusCodes.OK, 'delete User', null);
}
