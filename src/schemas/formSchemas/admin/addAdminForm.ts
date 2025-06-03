import { z } from "zod";

// zod validation schema for add user form
export const addAdminFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "Must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Must be at least 2 characters.",
  }),
  email: z.string().email().min(1, {
    message: "Must be a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Must be at least 8 digit.",
  }),
});
