import z from "zod";

export const aboutValidateInput = z.object({
  org_about: z.string().trim().min(1),
  mission: z.string().trim().min(1),
  vision: z.string().trim().min(1),
});

export const aboutValidateOptionalInput = aboutValidateInput.partial();
