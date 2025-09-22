import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/errors";

export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      success: false,
      error: err.message,
      details: err.details,
    });
  }

  return res.status(500).json({
    success: false,
    error: "Внутренняя ошибка сервера",
  });
};
