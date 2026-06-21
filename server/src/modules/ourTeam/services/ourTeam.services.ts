import OurTeam from "../models/OurTeam";

import type { OurTeamPayload } from "@app/types/modules/ourTeamType";

export const createOfficer = async (officer: OurTeamPayload) => {
  return await OurTeam.create(officer);
};

export const findOfficers = async () => {
  return await OurTeam.find().select("_id profile_image_url fullName position term");
};

export const findOfficerById = async (id: string) => {
  return await OurTeam.findById(id).select("_id public_id");
};

export const updateOfficerById = async (id: string, officer: Partial<OurTeamPayload>) => {
  return await OurTeam.updateOne({ _id: id }, { $set: officer });
};
