import type { Express } from "express";
import v1Router from "./v1/routes";

export const registerRoutes = (app: Express): void => {
  app.use("/api/v1", v1Router);
};
