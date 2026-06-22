import Events from "../models/Events";

import type { EventPayload } from "@app/types/modules/eventsType";

export const createEvent = async (payload: EventPayload) => {
  return await Events.create(payload);
};

export const findEvents = async () => {
  return await Events.find().sort({ start_date: 1 });
};

export const findEventById = async (id: string) => {
  return await Events.findOne({ _id: id }).select("_id public_ids");
};

export const updateEventById = async (id: string, data: Partial<EventPayload>) => {
  return await Events.updateOne({ _id: id }, { $set: data });
};

export const deleteEventById = async (id: string) => {
  return await Events.findOneAndDelete({ _id: id });
};
