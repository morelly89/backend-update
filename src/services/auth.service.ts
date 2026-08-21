import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { Resend } from "resend";
import { prisma } from "../config/db";

const resend = new Resend(process.env.RESEND_API_KEY);

export class AuthService {
  async register(email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const verificationTokenExpiry = new Date(
      Date.now() + 1000 * 60 * 60
    );

    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        emailVerificationToken: verificationToken,
        verificationTokenExpiry,
      },
    });

    const verificationUrl =
      `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

    await resend.emails.send({
      from: "Nugget <onboarding@resend.dev>",
      to: email,
      subject: "Verify your Nugget account",
      html: `
        <h2>Welcome to Nugget!</h2>
        <p>Please verify your email address to finish creating your account.</p>
        <a href="${verificationUrl}">Verify Email</a>
        <p>This link expires in 1 hour.</p>
      `,
    });

    return {
      email: user.email,
    };
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new Error("Invalid credentials");
    }

    if (!user.isEmailVerified) {
      throw new Error("Please verify your email before signing in");
    }

    return this.generateToken(user.id);
  }

  generateToken(userId: string) {
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );
  }

  async verifyEmail(token: string) {
    const user = await prisma.user.findUnique({
      where: {
        emailVerificationToken: token,
      },
    });

    if (!user) {
      throw new Error("Invalid verification token");
    }

    if (
      !user.verificationTokenExpiry ||
      user.verificationTokenExpiry < new Date()
    ) {
      throw new Error("Verification token has expired");
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isEmailVerified: true,
        emailVerificationToken: null,
        verificationTokenExpiry: null,
      },
    });

    return {
      email: user.email,
    };
  }
}