import { prisma } from "../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export class AuthService {
    async register(email: string, password: string) {
        const hashed = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {email, password: hashed},
        });
        return this.generateToken(user.id);

    }
    async login(email: string, password: string) {
        const user = await prisma.user.findUnique({ where: { email}});
        if(!user) throw new Error("Invalid credentials");

        const match = await bcrypt.compare(password, user.password);
        if(!match) throw new Error("Invalid credentials");

        return this.generateToken(user.id);
    }

    generateToken(userId: string) {
        return jwt.sign({ userId}, process.env.JWT_SECRET as string, { expiresIn: "7d"});

    }
}