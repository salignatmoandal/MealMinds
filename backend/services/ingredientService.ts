import { PrismaClient } from "@prisma/client";
import type { Ingredient } from '@prisma/client';

const prisma = new PrismaClient();

// Créer un nouvel ingrédient
export const createIngredient = async (data: { name: string; quantity: number; unit: number}): Promise<Ingredient> => {
    const newIngredient = await prisma.ingredient.create({
        data: {
            name: data.name,
            quantity: data.quantity,
            unit: data.unit
        }
    });
    return newIngredient;
};

// Lire tous les ingrédients
export const getAllIngredients = async (): Promise<Ingredient[]> => {
    const ingredients = await prisma.ingredient.findMany();
    return ingredients;
};

// Lire un ingrédient par ID
export const getIngredientById = async (id: number): Promise<Ingredient | null> => {
    const ingredient = await prisma.ingredient.findUnique({
        where: { id }
    });
    return ingredient;
};

// Mettre à jour un ingrédient
export const updateIngredient = async (id: number, data: { name?: string; quantity?: number; unit?: number }): Promise<Ingredient | null> => {
    const updatedIngredient = await prisma.ingredient.update({
        where: { id },
        data: {
            name: data.name,
            quantity: data.quantity,
            unit: data.unit
        }
    });
    return updatedIngredient;
};

// Supprimer un ingrédient
export const deleteIngredient = async (id: number): Promise<boolean> => {
    try {
        await prisma.ingredient.delete({
            where: { id }
        });
        return true;
    } catch (error) {
        console.error("Erreur lors de la suppression de l'ingrédient :", error);
        return false;
    }
};
