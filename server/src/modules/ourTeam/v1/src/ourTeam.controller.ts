import asyncErrorHandler from "express-async-handler";
import type { Request, Response } from "express";

import { client } from "@app/config/cache";
import type { FileUploadType } from "@app/types/IUploadFile";
import type { OurTeamPayload } from "@app/types/ourTeamTypes/ourTeamType";
import { createOfficer, findOfficerById, findOfficers, updateOfficerById } from "../../services/ourTeam.services";
import { errorHandler, responseHandler, ObjectIdValidator, fileUploader, deleteUploadedFile, cleanupUploadedImage } from "@modules/utils/index";

const OFFICERS_CACHE_KEY = "api:our-team:officers";

export const createNewOfficer = asyncErrorHandler(async (req: Request, res: Response) => {
  const { fullName, position, term } = req.body;
  const profile_image_url = req.file;

  if (!profile_image_url || !fullName || !position || !term) {
    return errorHandler("All fields are required", 400);
  }

  const uploadResult = (await fileUploader(profile_image_url.buffer)) as FileUploadType;

  const payload: OurTeamPayload = {
    ...req.body,
    profile_image_url: uploadResult.secure_url,
    public_id: uploadResult.public_id,
  };

  try {
    await createOfficer(payload);
  } catch (error) {
    await cleanupUploadedImage(uploadResult.public_id, "officer");
    throw error;
  }

  await client.del(OFFICERS_CACHE_KEY);

  responseHandler(res, true, 201, "Created successfully", null);
});

export const retrieveOfficers = asyncErrorHandler(async (req: Request, res: Response) => {
  const cache = await client.get(OFFICERS_CACHE_KEY);

  if (cache) {
    return responseHandler(res, true, 200, "Retrieved data successfully", JSON.parse(cache));
  }

  const officers = await findOfficers();

  await client.setEx(OFFICERS_CACHE_KEY, 30, JSON.stringify(officers));

  responseHandler(res, true, 200, "Retrieved data successfully", officers);
});

export const updateOfficer = asyncErrorHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { fullName, position, term } = req.body;
  const profile_image_url = req.file;
  let uploadedPublicId: string | undefined;

  if (!id || Array.isArray(id)) {
    return errorHandler("ID not found", 400);
  }

  ObjectIdValidator(id);

  const existingOfficer = await findOfficerById(id);

  if (!existingOfficer) {
    return errorHandler("Officer not found", 404);
  }

  const updateData: Partial<OurTeamPayload> = {};

  if (profile_image_url !== undefined) {
    const uploadResult = (await fileUploader(profile_image_url.buffer)) as FileUploadType;
    uploadedPublicId = uploadResult.public_id;

    updateData.profile_image_url = uploadResult.secure_url;
    updateData.public_id = uploadResult.public_id;
  }
  if (fullName !== undefined) updateData.fullName = fullName;
  if (position !== undefined) updateData.position = position;
  if (term !== undefined) updateData.term = term;

  if (Object.keys(updateData).length === 0) {
    return errorHandler("No officer data provided", 400);
  }

  let officer;

  try {
    officer = await updateOfficerById(id, updateData);
  } catch (error) {
    if (uploadedPublicId) {
      await cleanupUploadedImage(uploadedPublicId, "officer");
    }

    throw error;
  }

  if (officer.matchedCount === 0) {
    if (uploadedPublicId) {
      await cleanupUploadedImage(uploadedPublicId, "officer");
    }

    return errorHandler("Officer not found", 404);
  }

  if (profile_image_url !== undefined) {
    try {
      await deleteUploadedFile(existingOfficer.public_id); // still success if error occurred
    } catch (error) {
      console.error("Failed to delete previous officer image from Cloudinary:", error);
    }
  }

  await client.del(OFFICERS_CACHE_KEY);

  responseHandler(res, true, 200, "Updated officer successfully", null);
});
