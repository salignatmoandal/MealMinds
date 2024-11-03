import type { Context } from "hono";
import * as ingredientService from '../services/ingredientService';

// Créer un ingrédient
export const createIngredient = async (c: Context) => {
    const { name, quantity, unit } = await c.req.json();
    const newIngredient = await ingredientService.createIngredient({ name, quantity, unit });
    return c.json(newIngredient, 201);
};

// Lire tous les ingrédients
export const getAllIngredients = async (c: Context) => {
    const ingredients = await ingredientService.getAllIngredients();
    return c.json(ingredients);
};

// Lire un ingrédient par ID
export const getIngredientById = async (c: Context) => {
    const idParam = c.req.param('id'); // Obtenir l'ID sous forme de chaîne
    const id = parseInt(idParam, 10); // Convertir en nombre
    if (isNaN(id)) {
        return c.json({ error: "ID invalide" }, 400); // Vérifier si l'ID est valide
    }
    
    const ingredient = await ingredientService.getIngredientById(id); // Passer le nombre
    if (!ingredient) {
        return c.json({ error: "Ingrédient non trouvé" }, 404);
    }
    return c.json(ingredient);
};

// Mettre à jour un ingrédient
export const updateIngredient = async (c: Context) => {
    const idParam = c.req.param('id'); // Obtenir l'ID sous forme de chaîne
    const id = parseInt(idParam, 10); // Convertir en nombre
    const { name, quantity, unit } = await c.req.json();
    
    const updatedIngredient = await ingredientService.updateIngredient(id, { name, quantity, unit }); // Passer le nombre
    if (!updatedIngredient) {
        return c.json({ error: "Ingrédient non trouvé" }, 404);
    }
    return c.json(updatedIngredient);
};

// Supprimer un ingrédient
export const deleteIngredient = async (c: Context) => {
    const idParam = c.req.param('id'); // Obtenir l'ID sous forme de chaîne
    const id = parseInt(idParam, 10); // Convertir en nombre
    const deleted = await ingredientService.deleteIngredient(id); // Passer le nombre
    if (!deleted) {
        return c.json({ error: "Ingrédient non trouvé" }, 404);
    }
    return c.json({ message: "Ingrédient supprimé" });
};
