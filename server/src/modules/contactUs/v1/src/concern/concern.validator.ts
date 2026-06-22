import * as z from "zod";

const validateConcern = z.object({
  name: z.string().trim().min(5).optional().nullable(),
  email: z.email().trim().min(3).optional().nullable(),
  type: z.enum(["General", "Fees", "Events", "Technical", "Suggestion", "Complaint", "Other"]),
  subject: z.string().trim().min(5),
  details: z.string().trim().min(5),
});

export default validateConcern;
