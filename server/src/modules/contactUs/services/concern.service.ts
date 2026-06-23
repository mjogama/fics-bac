import Concern from "../models/Concern";

import type { ConcernPayload } from "@app/types/modules/contactUsType";

export const createConcern = async (payload: ConcernPayload) => {
  return await Concern.create(payload);
};

export const findConcerns = async () => {
  return await Concern.find().sort({ createdAt: -1 });
};

export const findConcernById = async (id: string) => {
  return await Concern.findOne({ _id: id }).select("_id");
};

export const deleteConcernById = async (id: string) => {
  return await Concern.findOneAndDelete({ _id: id });
};
