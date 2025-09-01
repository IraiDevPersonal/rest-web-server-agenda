import { RutManager } from "@/lib/rut-manager";
import { Gender, UserStatus } from "@prisma/client";
import z from "zod";

export const UpsertPatientApiSchema = z.object({
  email: z.email(),
  birth_date: z.date(),
  names: z.string().min(3),
  address: z.string().min(3),
  last_names: z.string().min(3),
  avatar_image: z.url().optional().nullable(),
  gender: z.enum(Gender, { error: "invalid gender" }),
  status: z.enum(UserStatus, { error: "invalid status" }),
  rut: z.string().refine(RutManager.validate, { error: "invalid rut" }),
  phone: z
    .string()
    .min(12)
    .max(12)
    .refine((v) => v.includes("+569"))
});
