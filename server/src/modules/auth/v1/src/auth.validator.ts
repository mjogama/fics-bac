import * as z from "zod";

export const authSignup = z.object({
  name: z.string().trim().min(6).max(56),
  email: z.email().trim().min(3).max(30),
  password: z.string().trim().min(8).regex(/[!@]/, "Password must include ! or @"),
});

export const authLogin = z.object({
  email: z.email().trim().min(3).max(30),
  password: z.string().trim().min(8),
});

export const authChangePassword = z.object({
  newPassword: z.string().trim().min(8).regex(/[!@]/, "Password must include ! or @"),
});
