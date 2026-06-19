import OurTeam from "../models/OurTeam";

import type { OurTeamPayload } from "@app/types/ourTeamTypes/ourTeam";

export const createOfficer = async (officer: OurTeamPayload) => {
  return await OurTeam.create(officer);
};

export const findOfficers = async () => {
  return await OurTeam.find().select("_id profileImageUrl fullName position term");
};

export const updateOfficerById = async (id: string, officer: Partial<OurTeamPayload>) => {
  return await OurTeam.updateOne({ _id: id }, { $set: officer });
};
