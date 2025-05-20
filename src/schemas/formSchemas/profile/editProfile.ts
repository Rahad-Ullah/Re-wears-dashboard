import { z } from "zod";

// const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB
// const ACCEPTED_IMAGE_TYPES = [
//   "image/jpeg",
//   "image/jpg",
//   "image/png",
//   "image/webp",
// ];

// zod validation schema for add user form
export const editProfileFormSchema = z.object({
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  gender: z.string().optional().nullable(),
  dob: z.string().optional().nullable(),
  email: z.string().email().optional().nullable(),
  location: z.string().optional().nullable(),
});
