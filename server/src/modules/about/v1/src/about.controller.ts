import type { Request, Response } from "express";
import asyncErrorHandler from "express-async-handler";

import type { AboutPayload } from "@app/types/modules/aboutType";
import { aboutValidateInput, aboutValidateOptionalInput } from "./about.validator";
import { createAbout, findAbout, findAboutById, updateAboutById } from "../../services/about.service";
import { errorHandler, getValidationErrorMessage, ObjectIdValidator, responseHandler } from "@modules/utils";

export const createNewAbout = asyncErrorHandler(async (req: Request, res: Response) => {
  const { org_about, mission, vision, active_members, yearly_event } = req.body;

  if (!org_about || !mission || !vision || !active_members || !yearly_event) {
    return errorHandler("All fields are required", 400);
  }

  const validateResult = await aboutValidateInput.safeParseAsync({
    org_about,
    mission,
    vision,
    active_members,
    yearly_event,
  });

  if (!validateResult.success) {
    const errMessage = getValidationErrorMessage(validateResult.error);
    return errorHandler(errMessage, 400);
  }

  const payload: AboutPayload = validateResult.data;

  const result = await createAbout(payload);

  responseHandler(res, 201, "Created about successfully", result);
});

export const retrieveAbout = asyncErrorHandler(async (req: Request, res: Response) => {
  const result = await findAbout();

  responseHandler(res, 200, "Retrieved about data successfully", result);
});

export const updateAbout = asyncErrorHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { org_about, mission, vision, active_members, yearly_event } = req.body;

  if (!id || Array.isArray(id)) {
    return errorHandler("ID not found or invalid", 400);
  }

  ObjectIdValidator(id);

  const validateResult = await aboutValidateOptionalInput.safeParseAsync({
    org_about,
    mission,
    vision,
    active_members,
    yearly_event,
  });

  if (!validateResult.success) {
    const errMessage = getValidationErrorMessage(validateResult.error);
    return errorHandler(errMessage, 400);
  }

  const existingAbout = await findAboutById(id);

  if (!existingAbout) {
    return errorHandler("ID not found or invalid", 404);
  }

  const updateData: Partial<AboutPayload> = {};
  const data = validateResult.data;

  if (data.org_about !== undefined) updateData.org_about = data.org_about;
  if (data.mission !== undefined) updateData.mission = data.mission;
  if (data.vision !== undefined) updateData.vision = data.vision;
  if (data.active_members !== undefined) updateData.active_members = data.active_members;
  if (data.yearly_event !== undefined) updateData.yearly_event = data.yearly_event;

  if (Object.keys(updateAbout).length !== 0) {
    return errorHandler("No about data fields provided", 400);
  }
  const result = await updateAboutById(id, updateData);

  responseHandler(res, 200, "Updated about data successfully", result);
});
