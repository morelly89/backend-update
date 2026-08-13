import { Request, Response, NextFunction } from "express";
import { ValidationService } from "../services/validation.service";

export function validateMiddleware(schema: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err: any) {
      res.status(400).json({ message: err.errors });
    }
  };
}

export function validateIdParams(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const id = req.params.id || req.params.parentProfileId || req.params.groupId;
  if (!ValidationService.isValidId(id as string)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  next();
}
