import { Hono } from "hono";
import ingredientRoutes from './routes/ingredientRoutes';

const app = new Hono();

app.get('/test', (c) => {
    return c.json({ message: 'Hello Test' });
});

app.get('/users', (c) => {
    return c.json({ message: 'Hello Users' });
});

app.use(ingredientRoutes);

export default app;