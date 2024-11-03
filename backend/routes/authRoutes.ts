// routes/auth.ts
import { Hono } from 'hono';
import * as authController from '../controllers/authController';

const authRouter = new Hono();

authRouter.post('/register', authController.registerUser);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout); // Route pour la déconnexion

export default authRouter;
