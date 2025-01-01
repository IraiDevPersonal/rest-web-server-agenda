import { z } from "zod";

export const appointmentStatusSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(1, { message: "El nombre debe tener al menos 1 caracter" }),
});
