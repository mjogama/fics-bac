import { Router } from "express";

import authRole from "@app/middlewares/authRole";
import { authToken } from "@app/middlewares/authToken";
import { meData, retrieveData, deleteUserAccount } from "./user.controller";

const router = Router();

router.get("/meData", authToken, meData);
router.get("/data", authToken, authRole("Admin", "Editor"), retrieveData);
router.delete("/del/:id", authToken, authRole("Admin"), deleteUserAccount);

export default router;
