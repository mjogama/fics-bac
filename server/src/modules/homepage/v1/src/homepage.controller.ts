import asyncErrorHandler from "express-async-handler";
import type { Request, Response } from "express";

import { client } from "@app/config/cache";
import type { FileUploadType } from "@app/types/IUploadFile";
import { validateHomepageInput, validateUpdateHomepageInput } from "./homepage.validator";
import type { HomepagePayload } from "@app/types/modules/homepageType";
import { fileUploader, getValidationErrorMessage } from "@modules/utils/index";
import { createHomepage, findHomepage, findHomepageById, updateHomepageById } from "../../services/homepage.service";
import { errorHandler, createAppError, responseHandler, ObjectIdValidator, cleanupUploadedImage } from "@modules/utils/index";

const HOMEPAGE_CACHE_KEY = "api:homepage";

export const createNewHomepage = asyncErrorHandler(async (req: Request, res: Response) => {
  const { title, sub_title, description } = req.body;
  const bg_image_url = req.file;

  if (!bg_image_url || !title || !sub_title || !description) {
    return errorHandler("All fields are required", 400);
  }

  const validatedResult = await validateHomepageInput.safeParseAsync({
    title,
    sub_title,
    description,
  });

  if (!validatedResult.success) {
    const error = getValidationErrorMessage(validatedResult.error);
    return errorHandler(error, 400);
  }

  const data = validatedResult.data;

  const uploadResult = (await fileUploader(bg_image_url.buffer)) as FileUploadType;

  const payload: HomepagePayload = {
    ...data,
    bg_image_url: uploadResult.secure_url,
    public_id: uploadResult.public_id,
  };

  try {
    const dbResult = await createHomepage(payload);
    await client.del(HOMEPAGE_CACHE_KEY);

    await responseHandler(res, 201, "Created new homepage successfully", dbResult);
  } catch (error) {
    await cleanupUploadedImage(uploadResult.public_id, "homepage");
    throw createAppError("Upload file failed.", 500);
  }
});

export const retrieveHomepage = asyncErrorHandler(async (req: Request, res: Response) => {
  const cache = await client.get(HOMEPAGE_CACHE_KEY);

  if (cache) {
    return responseHandler(res, 200, "Retrieved homepage data successfully", JSON.parse(cache));
  }

  const dbResult = await findHomepage();

  await client.setEx(HOMEPAGE_CACHE_KEY, 300, JSON.stringify(dbResult));

  responseHandler(res, 200, "Retrieved homepage data successfully", dbResult);
});

export const updateHomepage = asyncErrorHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, sub_title, description } = req.body;
  const bg_image_url = req.file;
  let uploadedPublicId: string | undefined;

  if (!id || Array.isArray(id)) {
    return errorHandler("ID not found", 400);
  }

  ObjectIdValidator(id);

  const existingHomepage = await findHomepageById(id);

  if (!existingHomepage) {
    return errorHandler("Homepage not found", 404);
  }

  const validatedResult = await validateUpdateHomepageInput.safeParseAsync({
    title,
    sub_title,
    description,
  });

  if (!validatedResult.success) {
    const error = getValidationErrorMessage(validatedResult.error);
    return errorHandler(error, 400);
  }

  const data = validatedResult.data;

  const updateData: Partial<HomepagePayload> = {};

  if (bg_image_url !== undefined) {
    const uploadResult = (await fileUploader(bg_image_url.buffer)) as FileUploadType;
    uploadedPublicId = uploadResult.public_id;

    updateData.bg_image_url = uploadResult.secure_url;
    updateData.public_id = uploadResult.public_id;
  }
  if (data.title !== undefined) updateData.title = data.title;
  if (data.sub_title !== undefined) updateData.sub_title = data.sub_title;
  if (data.description !== undefined) updateData.description = data.description;

  if (Object.keys(updateData).length === 0) {
    return errorHandler("No homepage data provided", 400);
  }

  let dbResult;

  try {
    dbResult = await updateHomepageById(id, updateData); // if updated files into db, it will throws an error in catch
    await client.del(HOMEPAGE_CACHE_KEY);
  } catch (error) {
    if (uploadedPublicId) {
      await cleanupUploadedImage(uploadedPublicId, "homepage");
    }

    throw error;
  }

  if (bg_image_url !== undefined) {
    await cleanupUploadedImage(existingHomepage.public_id, "homepage");
  }

  responseHandler(res, 200, "Updated homepage successfully", dbResult);
});
