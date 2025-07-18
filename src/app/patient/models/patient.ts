import { AppointmentStatus } from "@prisma/client";
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

export const PatientForAppointmentDetailSchema = z
  .object({
    names: z.string(),
    last_names: z.string(),
    rut: z.string(),
    phone: z.string(),
    email: z.string(),
    address: z.string()
  })
  .nullable();

export const PatientHistoryForAppointmentDetailSchema = z.object({
  uid: z.string().uuid("El UID debe ser un UUID válido"),
  date_time: z.string(),
  status: z.nativeEnum(AppointmentStatus)
});

export type PatientModel = z.infer<typeof PatientSchema>;
export type PatientForAppointmentDetailModel = z.infer<
  typeof PatientForAppointmentDetailSchema
>;
export type PatientHistoryForAppointmentDetailModel = z.infer<
  typeof PatientHistoryForAppointmentDetailSchema
>;
