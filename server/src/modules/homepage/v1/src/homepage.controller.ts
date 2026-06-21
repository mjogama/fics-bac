import asyncErrorHandler from "express-async-handler";
import type { Request, Response } from "express";

import { client } from "@app/config/cache";
import type { FileUploadType } from "@app/types/IUploadFile";
import { fileUploader, deleteUploadedFile } from "@modules/utils/index";
import type { HomepagePayload } from "@app/types/homepageTypes/homepageType";
import { errorHandler, responseHandler, ObjectIdValidator, cleanupUploadedImage } from "@modules/utils/index";
import { createHomepage, findHomepage, findHomepageById, updateHomepageById } from "../../services/homepage.service";

const HOMEPAGE_CACHE_KEY = "api:homepage";

export const createNewHomepage = asyncErrorHandler(async (req: Request, res: Response) => {
  const { title, sub_title, description } = req.body;
  const bg_image_url = req.file;

  if (!bg_image_url || !title || !sub_title || !description) {
    return errorHandler("All fields are required", 400);
  }

  const uploadResult = (await fileUploader(bg_image_url.buffer)) as FileUploadType;

  const payload: HomepagePayload = {
    ...req.body,
    bg_image_url: uploadResult.secure_url,
    public_id: uploadResult.public_id,
  };

  try {
    await createHomepage(payload);
  } catch (error) {
    await cleanupUploadedImage(uploadResult.public_id, "homepage");
    throw error;
  }

  await client.del(HOMEPAGE_CACHE_KEY);

  await responseHandler(res, true, 201, "Created successfully", null);
});

export const retrieveHomepage = asyncErrorHandler(async (req: Request, res: Response) => {
  const cache = await client.get(HOMEPAGE_CACHE_KEY);

  if (cache) {
    return responseHandler(res, true, 200, "Retrieved homepage data successfully", JSON.parse(cache));
  }

  const result = await findHomepage();

  await client.setEx(HOMEPAGE_CACHE_KEY, 300, JSON.stringify(result));

  responseHandler(res, true, 200, "Retrieved homepage data successfully", result);
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

  const updateData: Partial<HomepagePayload> = {};

  if (bg_image_url !== undefined) {
    const uploadResult = (await fileUploader(bg_image_url.buffer)) as FileUploadType;
    uploadedPublicId = uploadResult.public_id;

    updateData.bg_image_url = uploadResult.secure_url;
    updateData.public_id = uploadResult.public_id;
  }
  if (title !== undefined) updateData.title = title;
  if (sub_title !== undefined) updateData.sub_title = sub_title;
  if (description !== undefined) updateData.description = description;

  if (Object.keys(updateData).length === 0) {
    return errorHandler("No homepage data provided", 400);
  }

  let homepage;

  try {
    homepage = await updateHomepageById(id, updateData);
  } catch (error) {
    if (uploadedPublicId) {
      await cleanupUploadedImage(uploadedPublicId, "homepage");
    }

    throw error;
  }

  if (homepage.matchedCount === 0) {
    if (uploadedPublicId) {
      await cleanupUploadedImage(uploadedPublicId, "homepage");
    }

    return errorHandler("Homepage not found", 404);
  }

  if (bg_image_url !== undefined) {
    try {
      await deleteUploadedFile(existingHomepage.public_id); // still success if error occurred
    } catch (error) {
      console.error("Failed to delete previous homepage image from Cloudinary:", error);
    }
  }

  await client.del(HOMEPAGE_CACHE_KEY);

  responseHandler(res, true, 200, "Updated homepage successfully", null);
});
