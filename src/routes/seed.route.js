import { Router } from 'express';
import {
  deleteAllDataController,
  postInsertSeedDataController,
} from '../controllers/seed.controller.js';

const router = Router();

router.post('/seed/insertData', postInsertSeedDataController);

router.delete('/seed/deleteData', deleteAllDataController);

export default router;
