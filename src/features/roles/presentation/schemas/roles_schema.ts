import { z } from "zod";

export const roleSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(0, { message: "El nombre del rol no puede estar vacío" }),
});
