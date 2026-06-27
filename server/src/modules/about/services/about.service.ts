import About from "../models/About";

import type { AboutPayload } from "@app/types/modules/aboutType";

export const createAbout = async (payload: AboutPayload) => {
  return await About.create(payload);
};

export const findAbout = async () => {
  return await About.find();
};

export const findAboutById = async (id: string) => {
  return await About.findOne({ _id: id });
};

export const updateAboutById = async (id: string, data: Partial<AboutPayload>) => {
  return About.findOneAndUpdate({ _id: id }, { $set: data }, { returnDocument: "after", runValidators: true });
};
