import { AppointmentStatus } from "@prisma/client";
import { z } from "zod";

export const AppointmentDetailBdSchema = z.object({
  uid: z.uuid(),
  date: z.date(),
  time_to: z.string(),
  time_from: z.string(),
  is_enabled: z.boolean(),
  alert: z.any().optional(),
  appointment_status: z.enum(AppointmentStatus),
  patient: z
    .object({
      uid: z.uuid(),
      rut: z.string(),
      email: z.email(),
      names: z.string(),
      phone: z.string(),
      address: z.string(),
      last_names: z.string(),
      avatar_image: z.url().optional().nullable(),
      appointments: z
        .object({
          uid: z.uuid(),
          date: z.date(),
          time_to: z.string(),
          time_from: z.string(),
          appointment_status: z.enum(AppointmentStatus)
        })
        .array()
    })
    .nullable(),
  user: z.object({
    rut: z.string(),
    names: z.string(),
    last_names: z.string(),
    professions: z
      .object({
        profession: z.object({
          name: z.string()
        })
      })
      .array()
  })
});
