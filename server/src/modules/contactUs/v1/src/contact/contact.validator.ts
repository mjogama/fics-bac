import * as z from "zod";

export const validateContact = z.object({
  email: z.email().trim().min(3),
  location: z.string().trim().min(5),
  office_hours: z.string().trim().min(5),
  socials: z.array(z.url().refine((val) => /^https?:\/\/.+/.test(val), { message: "Link must be a verified source" })).min(1),
});

export const validateOptionalField = z.object({
  email: z.email().trim().min(3).optional(),
  location: z.string().trim().min(5).optional(),
  office_hours: z.string().trim().min(5).optional(),
  socials: z
    .array(z.url().refine((val) => /^https?:\/\/.+/.test(val), { message: "Link must be a verified source" }))
    .min(1)
    .optional(),
});
