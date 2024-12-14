import { Hono } from 'hono';
import * as userController from '../controllers/userController';

const app = new Hono();

app.get('/users', userController.getAllUsers);

app.get('/users/:id', userController.getUserById);

app.put('/users/:id', userController.updateUser);

app.delete('/users/:id', userController.deleteUser);

export default app;
