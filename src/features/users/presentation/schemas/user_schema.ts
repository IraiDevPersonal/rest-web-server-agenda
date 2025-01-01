import { z } from "zod";

export const userSchema = z.object({
  id: z.optional(z.number()),
  email: z.string().email(),
  is_admin: z.boolean(),
  last_names: z.string(),
  names: z.string(),
  password: z.string(),
  phone: z.string(),
  role_id: z.number(),
  rut: z.string().max(12),
  uid: z.optional(z.string()),
});
