import z from "zod";

export const validateHomepageInput = z.object({
  title: z.string().min(2),
  sub_title: z.string().min(2),
  description: z.string().min(2),
});

export const validateUpdateHomepageInput = validateHomepageInput.partial();
