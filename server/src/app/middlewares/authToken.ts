import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { client } from "@app/config/cache";
import { createAppError } from "@modules/utils/index";
import type { AuthPayload } from "../types/IAuthPayload";

export const authToken = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.cookies.accessToken;

  if (!id) {
    return next(createAppError("Unauthorized. Token not found", 401));
  }

  const isBlacklisted = await client.get(`blacklist:${id}`);
  if (isBlacklisted) {
    return next(createAppError("Token has been revoked", 401));
  }

  const decoded = jwt.verify(id, process.env.ACCESS_TOKEN || "") as AuthPayload;

  const payload = {
    id: decoded._id,
    name: decoded.name,
    email: decoded.email,
    role: decoded.role,
  };

  req.data = payload;

  next();
};
