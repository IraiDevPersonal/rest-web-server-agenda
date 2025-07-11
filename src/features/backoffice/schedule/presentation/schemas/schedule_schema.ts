import { WeekDay } from "@prisma/client";
import { z } from "zod";

export const ScheduleSchema = z.object({
  id: z.optional(z.number()),
  uid: z.optional(z.string()),
  professional_id: z.number(),
  date: z.date(),
  week_day: z.nativeEnum(WeekDay),
  time_from: z.string(),
  time_to: z.string(),
  is_enabled: z.boolean(),
});
