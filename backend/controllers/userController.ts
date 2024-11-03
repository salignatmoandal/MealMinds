import { type Context } from "hono";
import * as userService from "../services/userServices";


// Utilisation des contrôleurs pour les utilisateurs

export const createUser = async (c: Context) => {
  const data = await c.req.json().catch(() => null);
  if (!data) {
    return c.json({ error: "Invalid JSON input" }, 400);
  }

  // Extraire les champs `email`, `password`, et `name` de `data`
  const { email, password, name } = data;

  // Vérification basique pour s'assurer que les données requises sont présentes
  if (!email || !password || !name) {
    return c.json({ error: "Missing required fields: email, password, and name" }, 400);
  }

  // Appeler `userService.createUser` avec les arguments nécessaires
  const user = await userService.createUser(email, password, name);
  
  return c.json(user, 201);
};


// Logique de métiers pour GetUserById
export const getUserById = async (c: Context) => {
  const { id } = c.req.param();
  const user = await userService.getUserById(id);
  if (!user)
    return c.json(
      {
        error: "User not found",
      },
      404
    );
};

// Logique de métiers pour GetAllUser
export const getAllUsers = async (c: Context) => {
  const users = await userService.getAllUsers();

  return c.json(users);
};

// Logique de métier pour updateUser
export const updateUser = async (c: Context) => {
  const { id } = c.req.param();
  const data = await c.req.json().catch(() => null);
  if (!data) {
    return c.json({ error: "Invalid JSON input" }, 400);
  }
  const user = await userService.updateUser(id, data);
  return c.json(user);
};

export const deleteUser = async (c: Context) => {
  const { id } = c.req.param();
  await userService.deleteUser(id);
  return c.json(null, 204);
};
