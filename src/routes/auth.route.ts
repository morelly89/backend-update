import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authRateLimiter } from "../middleware/rateLimit.middleware";
import { validateMiddleware } from "../middleware/validate.middleware";
import { userRegisterSchema, userLoginSchema } from "../schemas/user.schema";

const router = Router();
const controller = new AuthController();

router.post("/register", authRateLimiter, validateMiddleware(userRegisterSchema), controller.register);
router.post("/login", authRateLimiter, validateMiddleware(userLoginSchema), controller.login);

export default router;