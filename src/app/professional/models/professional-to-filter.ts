import { z } from "zod";

import { OptionSchema } from "@/lib/schemas/global";

export const ProfessionalOptionSchema = OptionSchema.extend({
  professions: z.array(z.string())
});

export type ProfessionalOptionModel = z.infer<typeof ProfessionalOptionSchema>;
