import { Router } from "express";

import { createNewEvent, retrieveEvents, updateEvent, deleteEvent } from "./events.controller";
import uploadFileMiddleware from "@app/middlewares/uploadFileMiddleware";
import { authToken } from "@app/middlewares/authToken";
import authRole from "@app/middlewares/authRole";

const router = Router();

router.post("/create", authToken, authRole("Admin", "Editor"), uploadFileMiddleware.array("image_url"), createNewEvent);
router.get("/", authToken, authRole("Admin", "Editor", "Viewer"), retrieveEvents);
router.patch("/update/:id", authToken, authRole("Admin", "Editor"), updateEvent);
router.delete("/del/:id", authToken, authRole("Admin", "Editor"), deleteEvent);

export default router;
