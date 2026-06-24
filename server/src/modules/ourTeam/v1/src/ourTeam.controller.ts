import asyncErrorHandler from "express-async-handler";
import type { Request, Response } from "express";

import { client } from "@app/config/cache";
import type { FileUploadType } from "@app/types/IUploadFile";
import type { OurTeamPayload } from "@app/types/modules/ourTeamType";
import { validateOurTeamInput, validateUpdateOurTeamInput } from "./ourTeam.validator";
import { createOfficer, findOfficerById, findOfficers, updateOfficerById } from "../../services/ourTeam.services";
import { errorHandler, responseHandler, ObjectIdValidator, fileUploader, cleanupUploadedImage, getValidationErrorMessage } from "@modules/utils/index";

const OFFICERS_CACHE_KEY = "api:our-team:officers";

export const createNewOfficer = asyncErrorHandler(async (req: Request, res: Response) => {
  const { fullName, position, term, branch } = req.body;
  const profile_image_url = req.file;

  if (!profile_image_url || !fullName || !position || !term || !branch) {
    return errorHandler("All fields are required", 400);
  }

  const validatedResult = await validateOurTeamInput.safeParseAsync({
    fullName,
    position,
    term,
    branch,
  });

  if (!validatedResult.success) {
    const error = getValidationErrorMessage(validatedResult.error);
    return errorHandler(error, 400);
  }

  const data = validatedResult.data;

  const uploadResult = (await fileUploader(profile_image_url.buffer)) as FileUploadType;

  const payload: OurTeamPayload = {
    ...data,
    profile_image_url: uploadResult.secure_url,
    public_id: uploadResult.public_id,
  };

  let dbResult;

  try {
    dbResult = await createOfficer(payload);
  } catch (error) {
    await cleanupUploadedImage(uploadResult.public_id, "officer");
    throw error;
  }

  await client.del(OFFICERS_CACHE_KEY);

  responseHandler(res, 201, "Created new officer successfully", dbResult);
});

export const retrieveOfficers = asyncErrorHandler(async (req: Request, res: Response) => {
  const cache = await client.get(OFFICERS_CACHE_KEY);

  if (cache) {
    return responseHandler(res, 200, "Retrieved officers data successfully", JSON.parse(cache));
  }

  const dbResult = await findOfficers();

  await client.setEx(OFFICERS_CACHE_KEY, 30, JSON.stringify(dbResult));

  responseHandler(res, 200, "Retrieved data successfully", dbResult);
});

export const updateOfficer = asyncErrorHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { fullName, position, term, branch } = req.body;
  const profile_image_url = req.file;
  let uploadedPublicId: string | undefined;

  if (!id || Array.isArray(id)) {
    return errorHandler("ID not found", 400);
  }

  ObjectIdValidator(id);

  const validatedResult = await validateUpdateOurTeamInput.safeParseAsync({
    fullName,
    position,
    term,
    branch,
  });

  if (!validatedResult.success) {
    const error = getValidationErrorMessage(validatedResult.error);
    return errorHandler(error, 400);
  }

  const existingOfficer = await findOfficerById(id);

  if (!existingOfficer) {
    return errorHandler("Officer not found", 404);
  }

  const updateData: Partial<OurTeamPayload> = {};
  const data = validatedResult.data;

  if (profile_image_url !== undefined) {
    const uploadResult = (await fileUploader(profile_image_url.buffer)) as FileUploadType;
    uploadedPublicId = uploadResult.public_id;

    updateData.profile_image_url = uploadResult.secure_url;
    updateData.public_id = uploadResult.public_id;
  }

  if (data.fullName !== undefined) updateData.fullName = data.fullName;
  if (data.position !== undefined) updateData.position = data.position;
  if (data.term !== undefined) updateData.term = data.term;
  if (data.branch !== undefined) updateData.branch = data.branch;

  if (Object.keys(updateData).length === 0) {
    return errorHandler("No data field provided", 400);
  }

  let dbResult;

  try {
    dbResult = await updateOfficerById(id, updateData);
  } catch (error) {
    if (uploadedPublicId) {
      await cleanupUploadedImage(uploadedPublicId, "officer");
    }

    throw error;
  }

  if (profile_image_url !== undefined) {
    await cleanupUploadedImage(existingOfficer.public_id, "officer");
  }

  await client.del(OFFICERS_CACHE_KEY);

  responseHandler(res, 200, "Updated officer successfully", dbResult);
});
