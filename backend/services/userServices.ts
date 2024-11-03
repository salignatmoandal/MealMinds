import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';


// Initailisation de prisma client 
const prisma = new PrismaClient();


// 

// Créer un utilisateur

export const createUser = async (name: string, email: string,  password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name, 
    },
  });
};

// Récupération d'un utilisateur par ID 
export async function getUserById(id: string) {
    return await prisma.user.findUnique({ where: { id } });
  }


  // Mettre à jour un utilisateur
export async function updateUser(id: string, data: Partial<{ name: string; email: string; password: string }>) {
    return await prisma.user.update({
      where: { id },
      data,
    });
  }
  
  // Supprimer un utilisateur
  export async function deleteUser(id: string) {
    return await prisma.user.delete({ where: { id } });
  }
  

export async function getAllUsers() {
    return await prisma.user.findMany();
}
  