import { Router } from "express";
import { prisma } from "../config/db";
import { authMiddleware } from "../middleware/auth.middleware";
import { successResponse, errorResponse } from "../utils/response";

const router = Router();

/**
 * GET /api/stages
 * Returns all ChildStages lookup values
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const stages = await prisma.childStage.findMany({
      orderBy: { sortOrder: "asc" },
    });

    return successResponse(res, "Child stages fetched successfully", stages);
  } catch (error) {
    return errorResponse(res, "Failed to fetch child stages", 500);
  }
});

export default router;
