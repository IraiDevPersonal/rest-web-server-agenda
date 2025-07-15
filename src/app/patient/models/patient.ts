import { z } from "zod";

import { RutManager } from "@/lib/rut-manager";

export const PatientSchema = z.object({
  id: z.optional(z.bigint().positive()),
  uid: z.optional(z.string().uuid()),
  rut: z
    .string()
    .max(12)
    .refine((rut) => RutManager.validate(rut), {
      message: "rut invalido"
    }),
  names: z.string(),
  last_names: z.string(),
  email: z.string().email({ message: "Debe ser un email valido" }),
  phone: z.string().min(9, { message: "Mínimo 9 caracteres" }),
  address: z.string().min(10, { message: "Minimo 10 caracteres" }),
  is_deleted: z.optional(z.boolean().default(false))
});

export type PatientModel = z.infer<typeof PatientSchema>;
