import type { Response } from "express";

const authCookieOptions = {
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  httpOnly: true,
  path: "/api/v1",
};

export const setAuthCookie = (res: Response, key: string, value: string) => {
  res.cookie(key, value, authCookieOptions);
};

export const clearAuthCookie = (res: Response, key: string) => {
  res.clearCookie(key, authCookieOptions);
};
