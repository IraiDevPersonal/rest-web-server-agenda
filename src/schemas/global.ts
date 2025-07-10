import { z } from "zod";

export const OptionSchema = z.object({
  value: z.number().or(z.string()),
  label: z.string().min(1, "El label no puede estar vacío"),
});