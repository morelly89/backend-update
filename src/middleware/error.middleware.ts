import { request, response, NextFunction } from "express";

export function errorMiddleware(err: any, req: typeof request, res: typeof response, next: NextFunction) {
    console.error(err);
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
    });
}