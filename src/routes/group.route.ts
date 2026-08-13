import { Router } from "express";
import { GroupController } from "../controllers/group.controller";
import { authRateLimiter } from "../middleware/rateLimit.middleware";
import {  validateIdParams } from "../middleware/validate.middleware";


const router = Router();
const controller = new GroupController();

router.get("/", authRateLimiter, controller.getAll);
router.get("/:id", authRateLimiter, validateIdParams, controller.getOne);
router.post("/", authRateLimiter, controller.create);
router.put("/:id", authRateLimiter, validateIdParams, controller.update);
router.patch("/:id", authRateLimiter, validateIdParams, controller.update);
router.delete("/:id", authRateLimiter, validateIdParams, controller.delete);


export default router;
