import { RutManager } from "@/lib/rut-manager";
import { Gender, UserStatus } from "@prisma/client";
import z from "zod";

export const UpsertUserSchema = z.object({
  email: z.email(),
  birth_date: z.date(),
  gender: z.enum(Gender),
  names: z.string().min(3),
  roles: z.number().array(),
  status: z.enum(UserStatus),
  address: z.string().min(3),
  password: z.string().min(8),
  last_names: z.string().min(3),
  professions: z.number().array(),
  avatar_image: z.url().optional().nullable().default(null),
  rut: z.string().refine(RutManager.validate, { error: "invalid rut" }),
  phone: z
    .string()
    .min(12)
    .max(12)
    .refine((v) => v.includes("+569"))
});
