import type { Request, Response } from "express";
import asyncErrorHandler from "express-async-handler";

import type { ContactPayload } from "@app/types/modules/contactUsType";
import { validateContact, validateOptionalField } from "./contact.validator";
import { errorHandler, responseHandler, ObjectIdValidator, getValidationErrorMessage } from "@modules/utils/index";
import { createContact, findContacts, findContactById, updateContactById } from "../../../services/contact.service";

export const createNewContact = asyncErrorHandler(async (req: Request, res: Response) => {
  const { email, location, office_hours, socials } = req.body;

  if (!email || !location || !office_hours || !socials) {
    return errorHandler("All fields are required", 400);
  }

  const validatedResult = await validateContact.safeParseAsync({
    email,
    location,
    office_hours,
    socials,
  });

  if (!validatedResult.success) {
    const errMessage = getValidationErrorMessage(validatedResult.error);
    return errorHandler(errMessage, 400);
  }

  const data = validatedResult.data;

  const payload: ContactPayload = {
    email: data.email,
    location: data.location,
    office_hours: data.office_hours,
    socials: data.socials,
  };

  const dbResult = await createContact(payload);

  responseHandler(res, 201, "Created new contact successfully", dbResult);
});

export const retrieveContacts = asyncErrorHandler(async (req: Request, res: Response) => {
  const dbResult = await findContacts();

  responseHandler(res, 200, "Retrieved contacts data successfully", dbResult);
});

export const updateContact = asyncErrorHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, location, office_hours, socials } = req.body;

  if (!id || Array.isArray(id)) {
    return errorHandler("ID not found", 400);
  }

  ObjectIdValidator(id);

  const validatedResult = await validateOptionalField.safeParseAsync({
    email,
    location,
    office_hours,
    socials,
  });

  if (!validatedResult.success) {
    const errMessage = getValidationErrorMessage(validatedResult.error);
    return errorHandler(errMessage, 400);
  }

  const existingContact = await findContactById(id);

  if (!existingContact) {
    return errorHandler("Contact not found", 404);
  }

  const data = validatedResult.data;

  const updateData: Partial<ContactPayload> = {};

  if (data.email !== undefined) updateData.email = data.email;
  if (data.location !== undefined) updateData.location = data.location;
  if (data.office_hours !== undefined) updateData.office_hours = data.office_hours;
  if (data.socials !== undefined) updateData.socials = data.socials;

  if (Object.keys(updateData).length === 0) {
    return errorHandler("No data field provided", 400);
  }

  await updateContactById(id, updateData);

  responseHandler(res, 200, "Updated contact successfully", null);
});
