import { AppointmentStatus, Gender, UserStatus } from "@prisma/client";
import { z } from "zod";

import { RutManager } from "@/lib/rut-manager";

export const PatientSchema = z.object({
  id: z.optional(z.bigint().positive()),
  uid: z.optional(z.uuid()),
  rut: z
    .string()
    .max(12)
    .refine((rut) => RutManager.validate(rut), {
      message: "rut invalido"
    }),
  names: z.string(),
  last_names: z.string(),
  email: z.email({ message: "Debe ser un email valido" }),
  phone: z.string().min(9, { message: "Mínimo 9 caracteres" }),
  address: z.string().min(10, { message: "Minimo 10 caracteres" }),
  status: z.enum(UserStatus),
  birth_date: z.date("Fecha de nacimiento invalida"),
  gender: z.enum(Gender),
  avatar_image: z.string().optional().nullable()
});

export const PatientHistoryForAppointmentDetailSchema = z.object({
  uid: z.uuid("El UID debe ser un UUID válido"),
  date_time: z.string(),
  status: z.enum(AppointmentStatus)
});

export type PatientModel = z.infer<typeof PatientSchema>;
export type PatientHistoryForAppointmentDetailModel = z.infer<
  typeof PatientHistoryForAppointmentDetailSchema
>;
