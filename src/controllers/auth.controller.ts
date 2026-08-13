import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import { successResponse, errorResponse } from "../utils/response";

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const token = await authService.register(email, password);

      return successResponse(res, "User registered successfully", { token });
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
}
