import { Router } from "express";
import { PrivacyController } from "../controllers/privacy.controller";
import { validateIdParams } from "../middleware/validate.middleware";
import { authRateLimiter } from "../middleware/rateLimit.middleware";

const router = Router();
const controller = new PrivacyController();

router.get("/:parentProfileId", authRateLimiter, validateIdParams, controller.get);
router.put("/:parentProfileId", authRateLimiter, validateIdParams, controller.update);

export default router;
