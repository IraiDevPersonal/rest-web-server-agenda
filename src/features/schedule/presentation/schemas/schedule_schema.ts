import { z } from "zod";

export const ScheduleSchema = z.object({
  id: z.optional(z.number()),
  professional_id: z.number(),
  date: z.date(),
  week_day: z.enum([
    "LUNES",
    "MARTES",
    "MIERCOLES",
    "JUEVES",
    "VIERNES",
    "SABADO",
    "DOMINGO",
  ]),
  time_from: z.string(),
  time_to: z.string(),
  is_enabled: z.boolean(),
});
