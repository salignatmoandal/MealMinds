import { Hono } from 'hono';
import * as ingredientController from '../controllers/ingredientController';

const app = new Hono();

// Route pour créer un ingrédient
app.post('/ingredients', ingredientController.createIngredient);

// Route pour obtenir tous les ingrédients
app.get('/ingredients', ingredientController.getAllIngredients);

// Route pour obtenir un ingrédient par ID
app.get('/ingredients/:id', ingredientController.getIngredientById);

// Route pour mettre à jour un ingrédient par ID
app.put('/ingredients/:id', ingredientController.updateIngredient);

// Route pour supprimer un ingrédient par ID
app.delete('/ingredients/:id', ingredientController.deleteIngredient);

export default app;
