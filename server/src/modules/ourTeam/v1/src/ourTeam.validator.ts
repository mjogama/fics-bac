import z from "zod";

import { OUR_TEAM_BRANCHES } from "@app/constants/OUR_TEAM_BRANCHES";

export const validateOurTeamInput = z.object({
  fullName: z.string().trim().min(2),
  position: z.string().trim().min(2),
  term: z.string().trim().min(2),
  branch: z.enum(OUR_TEAM_BRANCHES),
});

export const validateUpdateOurTeamInput = validateOurTeamInput.partial();
