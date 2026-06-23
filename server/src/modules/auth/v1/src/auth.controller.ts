import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import asyncErrorHandler from "express-async-handler";

import { client } from "@app/config/cache";
import type { AuthPayload } from "@app/types/IAuthPayload";
import type { LoginDTO, SignupDTO } from "../../../../app/types/modules/authType";
import { LoginResponseDTO, SignupResponseDTO } from "./auth.dto";
import { retrieveUserById } from "@modules/userManagement/v1/index";
import { authSignup, authLogin, authChangePassword } from "./auth.validator";
import { signupUser, loginUser, updateUserName, updateUserPassword } from "@modules/auth/services/auth.service";
import { errorHandler, responseHandler, accessToken, refreshToken, setAuthCookie, clearAuthCookie, getValidationErrorMessage } from "@modules/utils/index";

export const signup = asyncErrorHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return errorHandler("All fields are required", 400);
  }

  const result = await authSignup.safeParseAsync({ name, email, password });
  if (!result.success) {
    const errMessage = getValidationErrorMessage(result.error);
    return errorHandler(errMessage, 400);
  }

  const payload: SignupDTO = result.data;

  await signupUser(payload);

  responseHandler(res, 201, "Signup successfully", SignupResponseDTO(payload));
});

export const login = asyncErrorHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return errorHandler("All fields are required", 400);
  }

  const result = await authLogin.safeParseAsync({ email, password });
  if (!result.success) {
    const errMessage = getValidationErrorMessage(result.error);
    return errorHandler(errMessage, 400);
  }

  const payload: LoginDTO = result.data;

  const dbResult = await loginUser(payload);

  const authPayload: AuthPayload = {
    _id: dbResult._id.toString(),
    name: dbResult.name,
    email: dbResult.email,
    role: dbResult.role,
  };

  const accessTokenHandler = accessToken(authPayload);
  const refreshTokenHandler = refreshToken(authPayload);

  setAuthCookie(res, "accessToken", accessTokenHandler);
  setAuthCookie(res, "refreshToken", refreshTokenHandler);

  responseHandler(res, 200, "Login successfully", LoginResponseDTO(authPayload));
});

export const logout = asyncErrorHandler(async (req: Request, res: Response) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return errorHandler("Token has been revoked", 404);
  }

  await client.setEx(`blacklist:${token}`, 300, "true");

  clearAuthCookie(res, "accessToken");
  clearAuthCookie(res, "refreshToken");

  responseHandler(res, 200, "Logout successfully", null);
});

export const refreshTokenUser = asyncErrorHandler(async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return errorHandler("Unauthorized. Token not found", 401);
  }

  const decoded = jwt.verify(token, process.env.REFRESH_TOKEN || "") as AuthPayload;
  const user = await retrieveUserById(decoded._id);

  if (!user) {
    return errorHandler("User not found", 404);
  }

  const authPayload: AuthPayload = {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessTokenHandler = accessToken(authPayload);
  const refreshTokenHandler = refreshToken(authPayload);

  setAuthCookie(res, "accessToken", accessTokenHandler);
  setAuthCookie(res, "refreshToken", refreshTokenHandler);

  responseHandler(res, 200, "Token refreshed successfully", LoginResponseDTO(authPayload));
});

export const changeName = asyncErrorHandler(async (req: Request, res: Response) => {
  const { id } = req.data;
  const { newName } = req.body;

  if (!newName) {
    return errorHandler("Name field is required", 400);
  }

  await updateUserName(id, newName);

  responseHandler(res, 200, "Changed name successfully", null);
});

export const changePassword = asyncErrorHandler(async (req: Request, res: Response) => {
  const { id } = req.data;
  const { newPassword } = req.body;

  if (!newPassword) {
    return errorHandler("Password field is required", 400);
  }

  const result = await authChangePassword.safeParseAsync({ newPassword });

  if (!result.success) {
    const errMessage = getValidationErrorMessage(result.error);
    return errorHandler(errMessage, 400);
  }

  const data = result.data;

  await updateUserPassword(id, data?.newPassword);

  responseHandler(res, 200, "Changed password successfully", null);
});
