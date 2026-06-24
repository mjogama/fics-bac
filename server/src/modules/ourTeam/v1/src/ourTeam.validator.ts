import z from "zod";

export const validateOurTeamInput = z.object({
  fullName: z.string().trim().min(2),
  position: z.string().trim().min(2),
  term: z.string().trim().min(2),
});

export const validateUpdateOurTeamInput = validateOurTeamInput.partial();
