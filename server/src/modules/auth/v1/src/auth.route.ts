import { Router } from "express";

import { authToken } from "@app/middlewares/authToken";
import { signup, login, logout, changeName, changePassword, refreshTokenUser } from "./auth.controller";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/change-name", authToken, changeName);
router.post("/change-password", authToken, changePassword);
router.post("/refresh-token", refreshTokenUser);

export default router;
