import { AppointmentStatus } from "@prisma/client";
import { z } from "zod";

export const UpsertAppointmentSchema = z.object({
  id: z.optional(z.number()),
  uid: z.optional(z.string()),
  patient_id: z.number().positive("El ID del paciente debe ser un número positivo"),
  schedule_id: z.number().positive("El ID del horario debe ser un número positivo"),
  appointment_status: z.enum(AppointmentStatus, {
    message: "Estado de la cita inválida"
  })
});
