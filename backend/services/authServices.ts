import { PrismaClient } from "@prisma/client"; // Assurez-vous d'utiliser la bonne importation pour PrismaClient
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; 
import { config } from 'dotenv';

// Charger les variables d'environnement
config();

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

// Vérifiez si la clé secrète est définie
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in the environment variables.');
}

export const registerUser = async (email: string, password: string, name: string) => {
    const hashedPassword = await bcrypt.hash(password, 10); 
    return await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,  
        }
    });
}

export const generateToken = (userId: string) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
};

export const loginUser = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
        // Utilisez JWT_SECRET défini précédemment
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' });
        return token;
    } else {
        throw new Error('Invalid credentials');
    }
};

// Fonctionnalité Deconnexion 
export function logoutUser(token: string) {
    throw new Error("Function not implemented.");
}

