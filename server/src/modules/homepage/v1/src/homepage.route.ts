import { Router } from "express";

import authRole from "@app/middlewares/authRole";
import { authToken } from "@app/middlewares/authToken";
import { retrieveData, updateHomepage } from "./homepage.controller";

const router = Router();

router.get("/data", authToken, authRole("Admin", "Editor"), retrieveData);
router.patch("/update/:id", authToken, authRole("Admin", "Editor"), updateHomepage);

export default router;
