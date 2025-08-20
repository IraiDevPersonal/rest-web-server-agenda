import { z } from "zod";

export const OptionSchema = z.object({
  value: z.string().min(1, "El valor no puede estar vacío"),
  label: z.string().min(1, "El label no puede estar vacío")
});

export const ResponseWithPaginationSchema = (DataSchema: z.ZodTypeAny) =>
  z.object({
    data: z.array(DataSchema),
    page: z.number().int().positive().default(1),
    total: z.number().int().positive().default(0),
    pages: z.number().int().positive().default(1),
    limit: z.number().int().positive().default(10)
  });
