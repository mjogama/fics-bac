import type { Request, Response, NextFunction } from "express";

import { STATUS_CODE } from "../constants/STATUS_CODE.js";

const globalErrorHandler = (err: any, _req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const errMessage = err.message || "Server error";

  const errTitle = STATUS_CODE[statusCode];

  res.status(statusCode).json({
    status: errTitle?.title,
    statusCode,
    details: {
      errMessage,
    },
  });
};

export default globalErrorHandler;
