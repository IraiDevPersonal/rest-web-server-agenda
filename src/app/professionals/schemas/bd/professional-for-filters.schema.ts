import { z } from "zod";

export const ProfessionalForFiltersSchema = z.object({
  id: z.bigint().positive(),
  names: z.string().min(1),
  last_names: z.string().min(1),
  professions: z
    .object({
      profession: z.object({
        id: z.number().int().positive()
      })
    })
    .array()
});
