import cookieParser from "cookie-parser";
import compression from "compression";
import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

import { limiter } from "./middlewares/rateLimit";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import { registerRoutes } from "./routes";

dotenv.config();

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.NODE_ENV === "production" ? "https://" : "http://localhost:5173",
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "application/json"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(compression());
app.use(morgan("dev"));
app.use(limiter);

registerRoutes(app);

app.use(globalErrorHandler);

export default app;
