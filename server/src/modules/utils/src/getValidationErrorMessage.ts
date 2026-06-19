import z from "zod";

const getValidationErrorMessage = (error: z.ZodError) => {
  const messages = error.issues.map((issue) => issue.message);
  return messages[messages.length - 1] ?? "Invalid input";
};

export default getValidationErrorMessage;
