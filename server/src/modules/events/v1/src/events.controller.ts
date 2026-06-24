import type { Request, Response } from "express";
import asyncErrorHandler from "express-async-handler";

import type { FileUploadType } from "@app/types/IUploadFile";
import type { EventPayload } from "@app/types/modules/eventsType";
import { validateEventsInput, validateUpdateEventsInput } from "./events.validator";
import { createEvent, findEvents, findEventById, updateEventById, deleteEventById } from "../../services/events.service";
import { errorHandler, createAppError, responseHandler, fileUploader, cleanupUploadedImage, ObjectIdValidator, deleteUploadedFile, getValidationErrorMessage } from "@modules/utils/index";

export const createNewEvent = asyncErrorHandler(async (req: Request, res: Response) => {
  const { start_date, end_date, title, status, location, time, description } = req.body;
  const image_files = Array.isArray(req.files) ? req.files : [];

  if (image_files.length === 0 || !start_date || !end_date || !title || !status || !location || !time || !description) {
    return errorHandler("All fields are required", 400);
  }

  const validatedResult = await validateEventsInput.safeParseAsync({
    start_date,
    end_date,
    title,
    status,
    location,
    time,
    description,
  });

  if (!validatedResult.success) {
    const error = getValidationErrorMessage(validatedResult.error);
    return errorHandler(error, 400);
  }

  const data = validatedResult.data;

  const uploadResults: FileUploadType[] = [];

  try {
    for (const image of image_files) {
      const uploadResult = (await fileUploader(image.buffer)) as FileUploadType;
      uploadResults.push(uploadResult);
    }

    const payload: EventPayload = {
      ...data,
      image_urls: uploadResults.map((result) => result.secure_url),
      public_ids: uploadResults.map((result) => result.public_id),
    };

    const dbResult = await createEvent(payload);
    responseHandler(res, 201, "Created new event successfully", dbResult);
  } catch (error) {
    await Promise.all(uploadResults.map((result) => cleanupUploadedImage(result.public_id, "event")));
    throw createAppError("Upload file failed.", 500);
  }
});

export const retrieveEvents = asyncErrorHandler(async (req: Request, res: Response) => {
  const dbResult = await findEvents();

  responseHandler(res, 200, "Retrieved events data successfully", dbResult);
});

export const updateEvent = asyncErrorHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { start_date, end_date, title, status, location, time, description } = req.body;

  if (!id || Array.isArray(id)) {
    return errorHandler("ID not found", 400);
  }

  ObjectIdValidator(id);

  const validatedResult = await validateUpdateEventsInput.safeParseAsync({
    start_date,
    end_date,
    title,
    status,
    location,
    time,
    description,
  });

  if (!validatedResult.success) {
    const error = getValidationErrorMessage(validatedResult.error);
    return errorHandler(error, 400);
  }

  const existingEvent = await findEventById(id);

  if (!existingEvent) {
    return errorHandler("Event not found", 404);
  }

  const updateData: Partial<EventPayload> = {};
  const data = validatedResult.data;

  if (data.start_date !== undefined) updateData.start_date = data.start_date;
  if (data.end_date !== undefined) updateData.end_date = data.end_date;
  if (data.title !== undefined) updateData.title = data.title;
  if (data.status !== undefined) updateData.status = data.status;
  if (data.location !== undefined) updateData.location = data.location;
  if (data.time !== undefined) updateData.time = data.time;
  if (data.description !== undefined) updateData.description = data.description;

  if (Object.keys(updateData).length === 0) {
    return errorHandler("No data field provided", 400);
  }

  const dbResult = await updateEventById(id, updateData);

  responseHandler(res, 200, "Updated event successfully", dbResult);
});

export const deleteEvent = asyncErrorHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || Array.isArray(id)) {
    return errorHandler("ID not found", 400);
  }

  ObjectIdValidator(id);

  const existingEvent = await findEventById(id);

  if (!existingEvent) {
    return errorHandler("Event not found", 404);
  }

  await deleteUploadedFile(existingEvent.public_ids);

  const dbResult = await deleteEventById(id);

  responseHandler(res, 200, "Deleted event successfully", dbResult);
});
