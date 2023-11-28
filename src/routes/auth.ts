import express, { Router } from 'express';
import authenticate from '../middlewares/auth';
import AuthController from '../controllers/AuthController';
import { validateCreateUserBody, validateLoginUserBody } from '../middlewares/validators/user';

const router: Router = express.Router();

router.post('/register', validateCreateUserBody, AuthController.register);
router.post('/login', validateLoginUserBody, AuthController.login);
router.get('/logout', authenticate, AuthController.logout);

export default router;