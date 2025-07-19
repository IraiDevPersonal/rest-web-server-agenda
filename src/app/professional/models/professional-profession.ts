import { z } from "zod";

export const ProfessionalProfession = z.object({
  professional_id: z.number().positive(),
  profession_id: z.number().positive()
});

export type ProfessionalProfessionModel = z.infer<
  typeof ProfessionalProfession
>;
