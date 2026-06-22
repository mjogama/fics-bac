import type { Request, Response } from "express";
import asyncErrorHandler from "express-async-handler";

import validateConcern from "./concern.validator";
import type { ConcernPayload } from "@app/types/modules/contactUsType";
import { createConcern, findConcerns, findConcernById, deleteConcernById } from "../../../services/concern.service";
import { errorHandler, responseHandler, ObjectIdValidator, getValidationErrorMessage } from "@modules/utils/index";

export const createNewConcern = asyncErrorHandler(async (req: Request, res: Response) => {
  const { name, email, type, subject, details } = req.body;

  if (!type || !subject || !details) {
    return errorHandler("All fields are required", 400);
  }

  const validatedResult = await validateConcern.safeParseAsync({
    name,
    email,
    type,
    subject,
    details,
  });

  if (!validatedResult.success) {
    const errMessage = getValidationErrorMessage(validatedResult.error);
    return errorHandler(errMessage, 400);
  }

  const data = validatedResult.data;

  const payload: ConcernPayload = {
    type: data.type,
    subject: data.subject,
    details: data.details,
  };

  if (data.name !== undefined) payload.name = data.name;
  if (data.email !== undefined) payload.email = data.email;

  const dbResult = await createConcern(payload);

  responseHandler(res, true, 201, "Created concern successfully", dbResult);
});

export const retrieveConcerns = asyncErrorHandler(async (req: Request, res: Response) => {
  const result = await findConcerns();

  responseHandler(res, true, 200, "Retrieved concerns successfully", result);
});

export const deleteConcern = asyncErrorHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || Array.isArray(id)) {
    return errorHandler("ID not found", 400);
  }

  ObjectIdValidator(id);

  const existingConcern = await findConcernById(id);

  if (!existingConcern) {
    return errorHandler("Concern not exists", 404);
  }

  const result = await deleteConcernById(id);

  responseHandler(res, true, 200, "Deleted concern successfully", result);
});
