import { Response } from "express";

export const handleError = (err: any, res: Response) => {
  console.error(err);
  res.status(500).json({ success: false, error: err.message || "Internal Server Error" });
};

export const isValidUUID = (id: string): boolean => {
  const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return regex.test(id);
};

export const formatResponse = (data: any) => ({
  success: true,
  data,
});
