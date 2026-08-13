import { Router } from "express";
import { prisma } from "../config/db";
import { authMiddleware } from "../middleware/auth.middleware";
import { successResponse, errorResponse } from "../utils/response";

const router = Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const needs = await prisma.familyNeed.findMany({
      orderBy: { label: "asc" },
    });
    return successResponse(res, "Family needs retrieved successfully", needs);
  } catch (err) {
    return errorResponse(res, "Failed to retrieve family needs", 500);
  }
});

export default router;
