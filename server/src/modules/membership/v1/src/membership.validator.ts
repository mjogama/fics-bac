import z from "zod";

const amount = z.coerce.number().min(0);
const optionalAmount = z.preprocess((value) => (value === "" ? undefined : value), amount.optional());

export const validateMembershipInput = z.object({
  name: z.string().trim().min(2),
  purpose: z.string().trim().min(2),
  amount,
  description: z.string().trim().min(2),
});

export const validateUpdateMembershipInput = validateMembershipInput.partial().extend({
  amount: optionalAmount,
});
