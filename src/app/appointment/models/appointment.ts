import { AppointmentStatus } from "@prisma/client";
import { z } from "zod";

export const AppointmentSchema = z.object({
  uid: z.string().uuid("El UID debe ser un UUID válido"),
  date: z.string(),
  time_from: z.string(),
  time_to: z.string(),
  patient_name: z.string().nullable(),
  patient_rut: z.string().nullable(),
  patient_phone: z.string().nullable(),
  professional_name: z.string(),
  appointment_status: z.enum(AppointmentStatus),
  professions: z.array(z.string())
});

export const UpsertAppointmentSchema = z.object({
  id: z.optional(z.number()),
  uid: z.optional(z.string()),
  patient_id: z.number().positive("El ID del paciente debe ser un número positivo"),
  schedule_id: z.number().positive("El ID del horario debe ser un número positivo"),
  appointment_status: z.enum(AppointmentStatus, {
    message: "Estado de la cita inválida"
  })
});

export type AppointmentModel = z.infer<typeof AppointmentSchema>;
export type UpsertAppointmentValues = z.infer<typeof UpsertAppointmentSchema>;
