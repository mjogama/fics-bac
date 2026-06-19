import asyncErrorHandler from "express-async-handler";
import type { Request, Response } from "express";

import { client } from "@app/config/cache";
import { retrieveHomepageData, updateHomepageData } from "../../services/homepage.service";
import { errorHandler, responseHandler, ObjectIdValidator } from "@modules/utils/index";

export const retrieveData = asyncErrorHandler(async (req: Request, res: Response) => {
  const cache = await client.get("homepage");

  if (cache) {
    responseHandler(res, true, 200, "Retrieved homepage data successfully", JSON.parse(cache));
    return;
  }

  const result = await retrieveHomepageData();

  await client.setEx("homepage", 300, JSON.stringify(result));

  responseHandler(res, true, 200, "Retrieved homepage data successfully", result);
});

export const updateHomepage = asyncErrorHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { imageUrl, title, description } = req.body;

  if (!id || Array.isArray(id)) {
    return errorHandler("ID not found", 400);
  }

  ObjectIdValidator(id);

  const updateData: Partial<{
    imageUrl: string;
    title: string;
    description: string;
  }> = {};

  if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;

  if (Object.keys(updateData).length === 0) {
    return errorHandler("No homepage data provided", 400);
  }

  const homepage = await updateHomepageData(id, updateData);

  if (homepage.matchedCount === 0) {
    return errorHandler("Homepage not found", 404);
  }

  responseHandler(res, true, 200, "Updated homepage successfully", homepage);
});
