import { z } from "zod";

export const RoleSchema = z.object({
  id: z.optional(z.number().positive()),
  name: z.string().min(1, { message: "El nombre del rol no puede estar vacío" })
});

export type RoleModel = z.infer<typeof RoleSchema>;
