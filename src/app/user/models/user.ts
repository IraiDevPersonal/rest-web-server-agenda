import { z } from "zod";

import { RoleSchema } from "@/app/role/models/role";

export const UserSchema = z.object({
  id: z.optional(z.bigint().positive().nullable()),
  email: z.string().email(),
  is_admin: z.boolean(),
  last_names: z.string(),
  names: z.string(),
  password: z.string(),
  phone: z.string(),
  role_id: z.number(),
  rut: z.string().max(12),
  uid: z.optional(z.string()),
  role: z.optional(RoleSchema)
});

export type UserModel = z.infer<typeof UserSchema>;
