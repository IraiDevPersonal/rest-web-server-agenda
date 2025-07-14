import { z } from "zod";

export const OptionSchema = z.object({
  value: z.string().min(1, "El valor no puede estar vacío"),
  label: z.string().min(1, "El label no puede estar vacío")
});
