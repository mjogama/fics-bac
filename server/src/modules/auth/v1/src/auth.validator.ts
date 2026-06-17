import * as z from "zod";

export const authSignup = z.object({
  name: z.string().min(6).max(56),
  email: z.email().min(3).max(30),
  password: z.string().min(8).regex(/[!@]/, "Password must include ! or @"),
});

export const authLogin = z.object({
  email: z.email().min(3).max(30),
  password: z.string().min(8),
});
