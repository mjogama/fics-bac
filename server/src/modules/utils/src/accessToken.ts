import { tokenConfig } from "@app/config/tokenConfig";
import jwt from "jsonwebtoken";

export const accessToken = (payload: object) => {
  return jwt.sign(payload, tokenConfig.accessTokenSecret, { expiresIn: "5m" });
};

export const refreshToken = (payload: object) => {
  return jwt.sign(payload, tokenConfig.refreshTokenSecret, { expiresIn: "1hr" });
};
