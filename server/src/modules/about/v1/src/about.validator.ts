import z from "zod";

export const aboutValidateInput = z.object({
  org_about: z.string().trim().min(1),
  mission: z.string().trim().min(1),
  vision: z.string().trim().min(1),
  active_members: z.number().min(1),
  yearly_event: z.number().min(1),
});

export const aboutValidateOptionalInput = aboutValidateInput.partial();
