import { z } from "zod";

export const patientSchema = z.object({
  id: z.optional(z.number()),
  uid: z.optional(z.string()),
  rut: z.string().max(12),
  names: z.string(),
  last_names: z.string(),
  email: z.string(),
  phone: z.string(),
});
