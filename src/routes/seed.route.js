import { Router } from 'express';
import { postInsertSeedDataController } from '../controllers/seed.controller.js';

const router = Router();

router.post('/seed/insertData', postInsertSeedDataController);

export default router;
