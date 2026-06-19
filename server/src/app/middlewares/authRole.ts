import type { Request, Response, NextFunction } from "express";
import { errorHandler } from "@modules/utils/index";

const authRole = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.data?.role) {
      return next(errorHandler("Invalid role", 403));
    }

    if (!allowedRoles.includes(req.data?.role)) {
      return next(errorHandler("Forbidden. You are not authorized to access this section", 403));
    }

    next();
  };
};

export default authRole;
