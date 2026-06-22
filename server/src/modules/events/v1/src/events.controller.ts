import type { Request, Response } from "express";
import asyncErrorHandler from "express-async-handler";

import type { FileUploadType } from "@app/types/IUploadFile";
import type { EventPayload } from "@app/types/modules/eventsType";
import { createEvent, findEvents, findEventById, updateEventById, deleteEventById } from "../../services/events.service";
import { errorHandler, responseHandler, fileUploader, cleanupUploadedImage, ObjectIdValidator, deleteUploadedFile } from "@modules/utils/index";

export const createNewEvent = asyncErrorHandler(async (req: Request, res: Response) => {
  const { start_date, end_date, title, status, location, time, description } = req.body;
  const image_files = Array.isArray(req.files) ? req.files : [];

  if (image_files.length === 0 || !start_date || !end_date || !title || !status || !location || !time || !description) {
    return errorHandler("All fields are required", 400);
  }

  const uploadResults: FileUploadType[] = [];

  try {
    for (const image of image_files) {
      const uploadResult = (await fileUploader(image.buffer)) as FileUploadType;
      uploadResults.push(uploadResult);
    }

    const payload: EventPayload = {
      ...req.body,
      image_urls: uploadResults.map((result) => result.secure_url),
      public_ids: uploadResults.map((result) => result.public_id),
    };

    await createEvent(payload);
  } catch (error) {
    await Promise.all(uploadResults.map((result) => cleanupUploadedImage(result.public_id, "event")));
    throw error;
  }

  responseHandler(res, true, 201, "Created event successfully", null);
});

export const retrieveEvents = asyncErrorHandler(async (req: Request, res: Response) => {
  const result = await findEvents();

  responseHandler(res, true, 200, "Retrieved events data successfully", result);
});

export const updateEvent = asyncErrorHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { start_date, end_date, title, status, location, time, description } = req.body;

  if (!id || Array.isArray(id)) {
    return errorHandler("ID not found", 400);
  }

  ObjectIdValidator(id);

  const existingEvent = await findEventById(id);

  if (!existingEvent) {
    return errorHandler("Event not found", 404);
  }

  const updateData: Partial<EventPayload> = {};

  if (start_date !== undefined) updateData.start_date = start_date;
  if (end_date !== undefined) updateData.end_date = end_date;
  if (title !== undefined) updateData.title = title;
  if (status !== undefined) updateData.status = status;
  if (location !== undefined) updateData.location = location;
  if (time !== undefined) updateData.time = time;
  if (description !== undefined) updateData.description = description;

  if (Object.keys(updateData).length === 0) {
    return errorHandler("No event data provided", 400);
  }

  await updateEventById(id, updateData);

  responseHandler(res, true, 200, "Updated event successfully", null);
});

export const deleteEvent = asyncErrorHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || Array.isArray(id)) {
    return errorHandler("ID not found", 400);
  }

  ObjectIdValidator(id);

  const existingEvent = await findEventById(id);

  if (!existingEvent) {
    return errorHandler("Event not exists", 404);
  }

  await deleteUploadedFile(existingEvent.public_ids);
  await deleteEventById(id);

  responseHandler(res, true, 200, "Deleted event successfully", null);
});
