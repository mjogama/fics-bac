import { Router } from "express";

import { authToken } from "@app/middlewares/authToken";
import { createNewAbout, retrieveAbout, updateAbout } from "./about.controller";

const router = Router();

router.post("/create", authToken, createNewAbout);
router.get("/data", authToken, retrieveAbout);
router.patch("/update/:id", authToken, updateAbout);

export default router;
