import { GroupService } from "../services/groups.service";
import { Request, Response, NextFunction } from "express";
import { successResponse, errorResponse } from "../utils/response";

const groupService = new GroupService();

export class GroupController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const groups = await groupService.getAllGroups();

      if (!groups || groups.length === 0) {
        return errorResponse(res, "No groups found", 404);
      }

      return successResponse(res, "Groups retrieved successfully", groups);
    } catch (err) {
      next(err);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const group = await groupService.getGroupById(req.params.id as string);

      if (!group) {
        return errorResponse(res, "Group not found", 404);
      }

      return successResponse(res, "Group retrieved successfully", group);
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const group = await groupService.createGroup(req.body);

      return successResponse(res, "Group created successfully", group, 201);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const group = await groupService.updateGroup(
        req.params.id as string,
        req.body
      );

      if (!group) {
        return errorResponse(res, "Group not found", 404);
      }

      return successResponse(res, "Group updated successfully", group);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const group = await groupService.deleteGroup(req.params.id as string);

      if (!group) {
        return errorResponse(res, "Group not found", 404);
      }

      return successResponse(res, "Group deleted successfully", group);
    } catch (err) {
      next(err);
    }
  }
}
