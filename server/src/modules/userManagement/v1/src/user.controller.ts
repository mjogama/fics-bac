import asyncErrorHandler from "express-async-handler";
import type { Request, Response } from "express";

import { client } from "@app/config/cache";
import { retrieveUsers, deleteUserAccountById } from "../../services/user.service";
import { errorHandler, responseHandler, parsePositiveInt, ObjectIdValidator } from "@modules/utils/index";

export const meData = asyncErrorHandler(async (req: Request, res: Response) => {
  const { data } = req;

  responseHandler(res, 200, "Retrieved data successfully", data);
});

export const retrieveData = asyncErrorHandler(async (req: Request, res: Response) => {
  const page = parsePositiveInt(req.query.page, 1);
  const cacheKey = `users:page:${page}`;

  const cache = await client.get(cacheKey);
  if (cache) {
    responseHandler(res, 200, "Retrieved data successfully", JSON.parse(cache));
    return;
  }

  const dbResult = await retrieveUsers(page);
  await client.setEx(cacheKey, 30, JSON.stringify(dbResult));

  responseHandler(res, 200, "Retrieved data successfully", dbResult);
});

export const deleteUserAccount = asyncErrorHandler(async (req: Request, res: Response) => {
  const id = String(req.params.id);

  ObjectIdValidator(id);

  if (!id) {
    return errorHandler("ID not found", 400);
  }

  const dbResult = await deleteUserAccountById(id);

  if (dbResult.deletedCount === 0) {
    return errorHandler("User not found", 404);
  }

  responseHandler(res, 200, "Deleted user account successfully", dbResult);
});
