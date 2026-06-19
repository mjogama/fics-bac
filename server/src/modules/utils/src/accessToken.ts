import jwt from "jsonwebtoken";

export const accessToken = (payload: object) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN || "", { expiresIn: "5m" });
};

export const refreshToken = (payload: object) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN || "", { expiresIn: "1hr" });
};
