import { z } from "zod";

import { ProfessionalSchema } from "@/app/professional/models/professional";

export const ScheduleSchema = z.object({
  id: z.number().positive().optional(),
  uid: z.optional(z.string().uuid()),
  professional_id: z.number(),
  date: z.date(),
  time_from: z.string(),
  time_to: z.string(),
  is_enabled: z.boolean(),
  professional: z.optional(ProfessionalSchema)
});

export type ScheduleModel = z.infer<typeof ScheduleSchema>;
