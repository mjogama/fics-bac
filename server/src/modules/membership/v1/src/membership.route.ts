import { Router } from "express";

import authRole from "@app/middlewares/authRole";
import { authToken } from "@app/middlewares/authToken";
import uploadFileMiddleware from "@app/middlewares/uploadFileMiddleware";
import { createNewTransaction, retrieveTransactions, updateTransaction, deleteTransaction } from "./membership.controller";

const router = Router();

router.post("/create", authToken, authRole("Admin", "Editor"), uploadFileMiddleware.array("image_urls"), createNewTransaction);
router.get("/data", authToken, authRole("Admin", "Editor", "Viewer"), retrieveTransactions);
router.patch("/update/:id", authToken, authRole("Admin", "Editor"), updateTransaction);
router.delete("/del/:id", authToken, authRole("Admin", "Editor"), deleteTransaction);

export default router;
