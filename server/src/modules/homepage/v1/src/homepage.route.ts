import { Router } from "express";

import authRole from "@app/middlewares/authRole";
import { authToken } from "@app/middlewares/authToken";
import uploadFileMiddleware from "@app/middlewares/uploadFileMiddleware";
import { createNewHomepage, retrieveHomepage, updateHomepage } from "./homepage.controller";

const router = Router();

router.post("/create", authToken, authRole("Admin", "Editor"), uploadFileMiddleware.single("bg_image_url"), createNewHomepage);
router.get("/data", authToken, authRole("Admin", "Editor", "Viewer"), retrieveHomepage);
router.patch("/update/:id", authToken, authRole("Admin", "Editor"), uploadFileMiddleware.single("bg_image_url"), updateHomepage);

export default router;
