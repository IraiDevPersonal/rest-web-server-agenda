import { RutManager } from "@/lib/rut-manager";
import { ResponseWithPaginationSchema } from "@/lib/schemas/global";
import { UserStatus, Gender } from "@prisma/client";
import { z } from "zod";

export const PatientBdSchema = z.object({
  rut: z
    .string()
    .max(12)
    .min(8)
    .refine((rut) => RutManager.validate(rut), {
      message: "invalid rut"
    }),
  uid: z.uuid(),
  email: z.email(),
  names: z.string(),
  birth_date: z.date(),
  last_names: z.string(),
  gender: z.enum(Gender),
  phone: z.string().min(9),
  status: z.enum(UserStatus),
  address: z.string().min(10),
  avatar_image: z.string().optional().nullable()
});

export const PatientBdWithPaginationSchema = ResponseWithPaginationSchema(PatientBdSchema);
