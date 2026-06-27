import z from "zod";

const eventDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YY-MM-DD format");

export const validateEventsInput = z.object({
  start_date: eventDate,
  end_date: eventDate,
  title: z.string().trim().min(2),
  status: z.enum(["upcoming", "ongoing", "completed", "postponed", "cancelled"]),
  location: z.string().trim().min(2),
  time: z.string().trim().min(2),
  description: z.string().trim().min(2),
});

export const validateUpdateEventsInput = validateEventsInput.partial();
