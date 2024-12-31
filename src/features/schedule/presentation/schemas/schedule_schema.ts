import { z } from "zod";
import { ScheduleEntity } from "../../domain/entities/schedule_entity";
import { WeekDay } from "@prisma/client";

export const ScheduleSchema = z.object({
  id: z.number(),
  professional_id: z.number(),
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
