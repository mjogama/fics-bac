import { Router } from "express";

import authRole from "@app/middlewares/authRole";
import { authToken } from "@app/middlewares/authToken";
import { createNewOfficer, retrieveOfficers, updateOfficer } from "./ourTeam.controller";

const router = Router();

router.post("/create", authToken, authRole("Admin", "Editor"), createNewOfficer);
router.get("/officers", authToken, retrieveOfficers);
router.patch("/update/:id", authToken, authRole("Admin", "Editor"), updateOfficer);

export default router;
