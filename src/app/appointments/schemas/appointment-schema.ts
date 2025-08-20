import { AppointmentStatus } from "@prisma/client";
import { z } from "zod";

export const BdAppointmentSchema = z.object({
  uid: z.uuid(),
  id: z.bigint(),
  date: z.date(),
  time_to: z.string(),
  time_from: z.string(),
  appointment_status: z.enum(AppointmentStatus)
});

export const RelatedBdAppointmentSchema = BdAppointmentSchema.extend({
  user: z.object({
    names: z.string(),
    last_names: z.string(),
    professions: z.array(
      z.object({
        profession: z.object({
          name: z.string()
        })
      })
    )
  }),
  patient: z
    .object({
      names: z.string(),
      last_names: z.string(),
      phone: z.string(),
      rut: z.string()
    })
    .nullable()
});
