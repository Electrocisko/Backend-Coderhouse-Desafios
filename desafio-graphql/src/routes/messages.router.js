import { Router } from 'express';
import { mailController } from '../controllers/messages.controllers.js'

const router = Router();

router.post('/mail', mailController )

export default router;

