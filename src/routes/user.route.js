import Router from 'express';

import asyncHandler from '../middleware/async-handler.js';

import { protect, admin } from '../middleware/auth.js';

import {
  deleteUserController,
  getUserByIdController,
  getUserProfileController,
  getUsersController,
  postAuthUserController,
  postLogoutUserController,
  postRegisterUserController,
  putUserByIdController,
  putUserProfileController,
} from '../controllers/user.controller.js';

const router = Router();

/* PUBLIC */
router.post('/auth', asyncHandler(postAuthUserController));
router.post('/register', asyncHandler(postRegisterUserController));

/* PRIVATE */
router.get('/', [protect, admin], asyncHandler(getUsersController));
router.get('/profile', protect, asyncHandler(getUserProfileController));
router.get('/:id', [protect, admin], asyncHandler(getUserByIdController));

router.put('/profile', protect, asyncHandler(putUserProfileController));
router.put('/logout', asyncHandler(postLogoutUserController));
router.put('/:id', [protect, admin], asyncHandler(putUserByIdController));

router.delete('/:id', [protect, admin], asyncHandler(deleteUserController));

export default router;
