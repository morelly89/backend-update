import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { successResponse } from "../utils/response";

const authService = new AuthService();

export class AuthController {
async register(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    const user = await authService.register(email, password);

    return successResponse(
      res,
      "User registered successfully. Please check your email.",
      user
    );
  } catch (err) {
    next(err);
  }
}

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const token = await authService.login(email, password);

      return successResponse(res, "User logged in successfully", { token });
    } catch (err) {
      next(err);
    }
  }

  async verifyEmail(req: Request, res: Response, next: NextFunction) {
  try {
    const { token } = req.query;

    if (typeof token !== "string") {
      throw new Error("Verification token is required");
    }

    const user = await authService.verifyEmail(token);

    return successResponse(
      res,
      "Email verified successfully",
      user
    );
  } catch (err) {
    next(err);
  }
}
}
