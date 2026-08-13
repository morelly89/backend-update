import { ProfileService } from "../services/profile.service";
import { Request, Response, NextFunction } from "express";
import { successResponse, errorResponse } from "../utils/response";

const parentService = new ProfileService();

export class ProfileController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const parents = await parentService.getALLProfiles();

      if (!parents || parents.length === 0) {
        return errorResponse(res, "No parents profile found", 404);
      }

      return successResponse(res, "Parents profile retrieved successfully", parents);
    } catch (err) {
      next(err);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const parent = await parentService.getProfileById(req.params.id as string);

      if (!parent) {
        return errorResponse(res, "Parent profile not found", 404);
      }

      const filtered = {
        ...parent,
        needs: parent.privacy?.isNeedsPublic ? parent.needs : [],
        stages: parent.privacy?.isChildStagePublic ? parent.stages : [],
        groups: parent.privacy?.isGroupsPublic ? parent.groups : [],
      };

      return successResponse(res, "Parent profile retrieved successfully", filtered);
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parent = await parentService.createProfile(req.body);

      return successResponse(res, "Parent profile created successfully", parent, 201);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const parent = await parentService.updateProfile(
        req.params.id as string,
        req.body
      );

      return successResponse(res, "Parent profile updated successfully", parent);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const parent = await parentService.deleteProfile(req.params.id as string);

      return successResponse(res, "Parent profile deleted successfully", parent);
    } catch (err) {
      next(err);
    }
  }
}
