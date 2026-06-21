import Homepage from "../models/Homepage";
import type { HomepagePayload } from "@app/types/homepageTypes/homepageType";

export const createHomepage = async (payload: HomepagePayload) => {
  return await Homepage.create(payload);
};

export const findHomepage = async () => {
  return await Homepage.find().select("_id bg_image_url title sub_title description");
};

export const findHomepageById = async (id: string) => {
  return await Homepage.findById(id).select("_id public_id");
};

export const updateHomepageById = async (id: string, data: Partial<HomepagePayload>) => {
  return await Homepage.updateOne({ _id: id }, { $set: data });
};
