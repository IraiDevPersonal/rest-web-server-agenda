import { z } from "zod";

export const RoleSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1)
});
