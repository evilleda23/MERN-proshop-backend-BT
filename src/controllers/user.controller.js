import { StatusCodes } from 'http-status-codes';
import { HTTP_RESPONSE } from '../utils/http-response.utils.js';

import {} from '../services/user.service.js';

/* PUBLIC */

//@desc    Auth user & get token
//@route   POST /api/users/login
//@access  Public
export async function postAuthUserController(req, res) {
  return HTTP_RESPONSE(res, StatusCodes.OK, 'Auth User', null);
}

//@desc    Register user
//@route   POST /api/users/register
//@access  Public
export async function postRegisterUserController(req, res) {
  return HTTP_RESPONSE(res, StatusCodes.OK, 'Register User', null);
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
  return HTTP_RESPONSE(res, StatusCodes.OK, 'Logout User', null);
}

//@desc    Delete user
//@route   DELETE /api/users/:id
//@access  Private/Admin
export async function deleteUserController(req, res) {
  return HTTP_RESPONSE(res, StatusCodes.OK, 'delete User', null);
}
