import { Router } from "express";

import authRole from "@app/middlewares/authRole";
import { authToken } from "@app/middlewares/authToken";
import { createNewConcern, retrieveConcerns, deleteConcern } from "./concern.controller";

const router = Router();

router.post("/create", authToken, authRole("Admin", "Viewer"), createNewConcern);
router.get("/concerns", authToken, authRole("Admin", "Editor", "Viewer"), retrieveConcerns);
router.delete("/del/:id", authToken, authRole("Admin"), deleteConcern);

export default router;
