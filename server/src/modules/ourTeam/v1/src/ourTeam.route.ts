import { Router } from "express";

import authRole from "@app/middlewares/authRole";
import { authToken } from "@app/middlewares/authToken";
import uploadFileMiddleware from "@app/middlewares/uploadFileMiddleware";
import { createNewOfficer, retrieveOfficers, updateOfficer } from "./ourTeam.controller";

const router = Router();

router.post("/create", authToken, authRole("Admin", "Editor"), uploadFileMiddleware.single("profile_image_url"), createNewOfficer);
router.get("/data", authToken, authRole("Admin", "Editor", "Viewer"), retrieveOfficers);
router.patch("/update/:id", authToken, authRole("Admin", "Editor"), uploadFileMiddleware.single("profile_image_url"), updateOfficer);

export default router;
