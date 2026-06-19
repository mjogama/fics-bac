import asyncErrorHandler from "express-async-handler";
import type { Request, Response } from "express";

import type { OurTeamPayload } from "@app/types/ourTeamTypes/ourTeam";
import { createOfficer, findOfficers, updateOfficerById } from "../../services/ourTeam.services";
import { errorHandler, ObjectIdValidator, responseHandler } from "@modules/utils/index";

export const createNewOfficer = asyncErrorHandler(async (req: Request, res: Response) => {
  const { profileImageUrl, fullName, position, term } = req.body;

  if (!profileImageUrl || !fullName || !position || !term) {
    return errorHandler("All fields are required", 400);
  }

  const payload: OurTeamPayload = req.body;

  const createdOfficer = await createOfficer(payload);

  responseHandler(res, true, 201, "Created successfully", null);
});

export const retrieveOfficers = asyncErrorHandler(async (req: Request, res: Response) => {
  const officers = await findOfficers();

  responseHandler(res, true, 200, "Retrieved data successfully", officers);
});

export const updateOfficer = asyncErrorHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { profileImageUrl, fullName, position, term } = req.body;

  if (!id || Array.isArray(id)) {
    return errorHandler("ID not found", 400);
  }

  ObjectIdValidator(id);

  const updateData: Partial<OurTeamPayload> = {};

  if (profileImageUrl !== undefined) updateData.profileImageUrl = profileImageUrl;
  if (fullName !== undefined) updateData.fullName = fullName;
  if (position !== undefined) updateData.position = position;
  if (term !== undefined) updateData.term = term;

  if (Object.keys(updateData).length === 0) {
    return errorHandler("No homepage data provided", 400);
  }

  const officer = await updateOfficerById(id, updateData);

  if (officer.matchedCount === 0) {
    return errorHandler("Homepage not found", 404);
  }

  responseHandler(res, true, 200, "Updated officer successfully", null);
});
