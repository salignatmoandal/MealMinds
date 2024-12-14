// controllers/authController.ts
import type { Context } from "hono";
import * as authService from '../services/authServices'

// Inscription 
export const registerUser = async (c: Context) => {
    const { email, password, name } = await c.req.json();
    console.log(`registerUser: ${email}, ${password}, ${name}`);
    const user = await authService.registerUser(email, password, name);
    return c.json(user);
};

// Connexion 
export const login = async (c: Context) => {
    const { email, password } = await c.req.json();
    console.log(`login: ${email}, ${password}`);
    const token = await authService.loginUser(email, password);
    console.log(`Token: ${token}`);
    return c.json({ token });
};

// Déconnexion
export const logout = async (c: Context) => {
    const token = c.req.header('Authorization')?.replace('Bearer ', ''); // Récupère le token depuis l'en-tête Authorization
    if (!token) {
        console.log("Tentative de déconnexion sans token");
        return c.json({ error: "Token manquant" }, 401);
    }
    
    await authService.logoutUser(token);
    console.log("Déconnexion réussie");
    return c.json({ message: "Déconnexion réussie" });
};
