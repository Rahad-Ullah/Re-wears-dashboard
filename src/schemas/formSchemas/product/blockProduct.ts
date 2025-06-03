import { z } from "zod";

export const blockProductFormSchema = z.object({
  message: z.string().optional(),
});
