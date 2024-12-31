import { z } from "zod";

export const patientSchema = z.object({
  id: z.number(),
  uid: z.string(),
  rut: z.string().max(12),
  names: z.string(),
  last_names: z.string(),
  email: z.string(),
  phone: z.string(),
});
