import cookieParser from "cookie-parser";
import compression from "compression";
import express, { type Request, type Response } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

dotenv.config();

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "application/json"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(compression());
app.use(morgan("dev"));

app.get("/api", async (req: Request, res: Response) => {
  res.status(200).json("check");
});
export default app;
