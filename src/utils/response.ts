import { Response } from "express";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export function successResponse<T>(
  res: Response,
  message: string,
  data: T,
  statusCode = 200
): Response<ApiResponse<T>> {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

export function errorResponse(
  res: Response,
  message = "Request failed",
  statusCode = 500
): Response<ApiResponse<null>> {
  return res.status(statusCode).json({
    success: false,
    message,
  });
}
