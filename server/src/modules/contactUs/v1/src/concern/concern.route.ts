import { Router } from "express";

import authRole from "@app/middlewares/authRole";
import { authToken } from "@app/middlewares/authToken";
import { concernCreateLimiter } from "@app/middlewares/rateLimit";
import { createNewConcern, retrieveConcerns, deleteConcern } from "./concern.controller";

const router = Router();

router.post("/create", authToken, concernCreateLimiter, createNewConcern);
router.get("/data", authToken, authRole("Admin", "Editor", "Viewer"), retrieveConcerns);
router.delete("/del/:id", authToken, authRole("Admin"), deleteConcern);

export default router;
