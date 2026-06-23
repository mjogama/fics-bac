import type { Request, Response, NextFunction } from "express";

import { STATUS_CODE } from "../constants/STATUS_CODE";

const globalErrorHandler = (err: any, _req: Request, res: Response, next: NextFunction) => {
  let statusCode = err.statusCode || 500;
  let errMessage = err.message || "Server error";

  // Mongoose validation error
  if (err.name === "ValidationError") {
    statusCode = 400;
    errMessage = Object.values(err.errors)
      .map((error: any) => error.message)
      .join(", ");
  }
  // Mongoose invalid ObjectId / cast error
  if (err.name === "CastError") {
    statusCode = 400;
    errMessage = `Invalid ${err.path}: ${err.value}`;
  }

  const errTitle = STATUS_CODE[statusCode];

  res.status(statusCode).json({
    status: errTitle?.title,
    statusCode,
    errMessage,
  });
};

export default globalErrorHandler;
