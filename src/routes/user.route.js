import Router from 'express';

import asyncHandler from '../middleware/async-handler.js';

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
router.post('/login', asyncHandler(postAuthUserController));
router.post('/register', asyncHandler(postRegisterUserController));

/* PRIVATE */
router.get('/', asyncHandler(getUsersController));
router.get('/profile', asyncHandler(getUserProfileController));
router.get('/:id', asyncHandler(getUserByIdController));

router.put('/profile', asyncHandler(putUserProfileController));
router.put('/logout', asyncHandler(postLogoutUserController));
router.put('/:id', asyncHandler(putUserByIdController));

router.delete('/:id', asyncHandler(deleteUserController));

export default router;
