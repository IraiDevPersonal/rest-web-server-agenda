import { AppointmentStatus } from "@prisma/client";
import { z } from "zod";

export const AppointmentSchema = z.object({
  uid: z.uuid("El UID debe ser un UUID válido"),
  date: z.string(),
  time_from: z.string(),
  time_to: z.string(),
  professional: z.object({
    full_name: z.string(),
    professions: z.array(z.string())
  }),
  patient: z
    .object({
      full_name: z.string(),
      rut: z.string(),
      phone: z
        .string()
        .regex(/^\+?[1-9]\d{8,14}$/, "El teléfono debe ser un número válido")
    })
    .nullable(),
  appointment_status: z.enum(AppointmentStatus)
});
