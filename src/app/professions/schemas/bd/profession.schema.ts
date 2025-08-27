import { z } from "zod";

export const ProfessionSchema = z.object({
  id: z.number().positive(),
  name: z.string().min(1)
});
