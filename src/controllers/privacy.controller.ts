import { Request, Response, NextFunction } from "express";
import { PrivacyService } from "../services/privacy.service";
import { successResponse, errorResponse } from "../utils/response";

const privacyService = new PrivacyService();

export class PrivacyController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { parentProfileId } = req.params;
      const settings = await privacyService.getPrivacySettings(parentProfileId as string);

      if (!settings) {
        return errorResponse(res, "Privacy settings not found", 404);
      }

      return successResponse(res, "Privacy settings retrieved successfully", settings);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { parentProfileId } = req.params;

      const updated = await privacyService.updatePrivacySettings(
        parentProfileId as string,
        req.body
      );

      if (!updated) {
        return errorResponse(res, "Privacy settings not found", 404);
      }

      return successResponse(res, "Privacy settings updated successfully", updated);
    } catch (err) {
      next(err);
    }
  }
}
