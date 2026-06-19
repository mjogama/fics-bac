import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      data?: any; // Change 'any' to your specific data type if known
    }
  }
}
