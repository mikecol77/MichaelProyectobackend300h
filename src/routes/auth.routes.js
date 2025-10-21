import { Router } from 'express';
import { register, login, me } from '../controllers/auth.controller.js';
import { isAuth } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', isAuth, me);

export default router;
