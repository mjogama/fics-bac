import { Router } from "express";

import { createNewTransaction, retrieveTransactions, updateTransaction, deleteTransaction } from "./membership.controller";
import uploadFileMiddleware from "@app/middlewares/uploadFileMiddleware";
import { authToken } from "@app/middlewares/authToken";
import authRole from "@app/middlewares/authRole";
const router = Router();

router.post("/create", authToken, authRole("Admin"), uploadFileMiddleware.array("image_url"), createNewTransaction);
router.get("/transactions", authToken, authRole("Admin", "Editor", "Viewer"), retrieveTransactions);
router.patch("/update/:id", authToken, authRole("Admin", "Editor"), updateTransaction);
router.delete("/del/:id", authToken, authRole("Admin", "Editor"), deleteTransaction);

export default router;
