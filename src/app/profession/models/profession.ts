import { z } from "zod";

export const ProfessionSchema = z.object({
  id: z.number().positive().optional(),
  name: z
    .string()
    .min(1, { message: "El nombre de la profesión no puede estar vacío" })
});

export type ProfessionModel = z.infer<typeof ProfessionSchema>;
