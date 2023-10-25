import { StatusCodes } from 'http-status-codes';
import { HTTP_RESPONSE } from '../utils/http-response.util.js';

import { createUser, findUserByEmail } from '../services/user.service.js';
import { generateToken } from '../utils/jwt.util.js';

/* PUBLIC */

//@desc    Auth user & get token
//@route   POST /api/users/login
//@access  Public
export async function postAuthUserController(req, res) {
  const { email, password } = req.body;

  const userDB = await findUserByEmail(email);

  if (userDB && (await userDB.matchPassword(password))) {
    const token = generateToken({ userId: userDB._id });
    const maxAge =
      eval(process.env.COOKIE_MAX_AGE) || Number(process.env.COOKIE_MAX_AGE);
    //Set cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: maxAge || 1000 * 60 * 60 * 24 * 7, //7 days
    });

    const user = {
      id: userDB._id,
      name: userDB.name,
      email: userDB.email,
      isAdmin: userDB.isAdmin,
    };

    return HTTP_RESPONSE(res, StatusCodes.OK, 'Auth User', user);
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
  return HTTP_RESPONSE(res, StatusCodes.OK, 'Register User', user);
}

/* PRIVATE */

//@desc    Get user
//@route   GET /api/users/:id
//@access  Private/Admin
export async function getUserByIdController(req, res) {
  return HTTP_RESPONSE(res, StatusCodes.OK, 'LOL User', null);
}

//@desc    Get users
//@route   GET /api/users
//@access  Private/Admin
export async function getUsersController(req, res) {
  return HTTP_RESPONSE(res, StatusCodes.OK, 'Get Users', null);
}

//@desc    Get user profile
//@route   GET /api/users/profile
//@access  Private
export async function getUserProfileController(req, res) {
  return HTTP_RESPONSE(res, StatusCodes.OK, 'Get User Profile', null);
}

//@desc    Update user
//@route   PUT /api/users/:id
//@access  Private/Admin
export async function putUserByIdController(req, res) {
  return HTTP_RESPONSE(res, StatusCodes.OK, 'Update User', null);
}

//@desc    Update user profile
//@route   PUT /api/users/profile
//@access  Private
export async function putUserProfileController(req, res) {
  return HTTP_RESPONSE(res, StatusCodes.OK, 'Update User Profile', null);
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
  return HTTP_RESPONSE(res, StatusCodes.OK, 'delete User', null);
}
