import { Router } from "express";
import { ProfileController } from "../controllers/profile.controller";
import { validateIdParams, validateMiddleware } from "../middleware/validate.middleware";
import { parentProfileSchema } from "../schemas/parentProfile.schema";
import { authRateLimiter } from "../middleware/rateLimit.middleware";

const router = Router();
const controller = new ProfileController();

router.get("/", authRateLimiter, controller.getAll);
router.get("/:id", authRateLimiter, validateIdParams, controller.getOne);
router.post("/", authRateLimiter, validateMiddleware(parentProfileSchema), controller.create);
router.put("/:id", authRateLimiter, validateIdParams, validateMiddleware(parentProfileSchema), controller.update);
router.patch("/:id", authRateLimiter, validateIdParams, controller.update);
router.delete("/:id", authRateLimiter, validateIdParams, controller.delete);

export default router;