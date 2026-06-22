import { Router } from "express";

import authRole from "@app/middlewares/authRole";
import { authToken } from "@app/middlewares/authToken";
import { createNewContact, retrieveContacts, updateContact } from "./contact.controller";

const router = Router();

router.post("/create", authToken, authRole("Admin", "Editor"), createNewContact);
router.get("/contacts", authToken, authRole("Admin", "Editor", "Viewer"), retrieveContacts);
router.patch("/update/:id", authToken, authRole("Admin", "Editor"), updateContact);

export default router;
