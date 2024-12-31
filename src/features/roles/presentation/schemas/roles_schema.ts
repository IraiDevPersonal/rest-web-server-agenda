import { z } from "zod";

export const roleSchema = z.object({
  id: z.number(),
  name: z.string(),
});
