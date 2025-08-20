import { z } from "zod";
import { UserStatus } from "@prisma/client";
import { Gender } from "@prisma/client";
import { RoleSchema } from "@/app/role/models/role";
import { ProfessionSchema } from "@/app/profession/models/profession";
import { AppointmentSchema } from "@/app/appointments/schemas/appointment-schema";
import { RutManager } from "@/lib/rut-manager";

export const UserSchema = z.object({
  id: z.optional(z.bigint().positive()),
  uid: z.optional(z.uuid()),
  rut: z
    .string()
    .max(12)
    .refine((rut) => RutManager.validate(rut), {
      message: "rut invalido"
    }),
  names: z.string(),
  last_names: z.string(),
  email: z.email(),
  password: z.string(),
  phone: z.string(),
  status: z.enum(UserStatus),
  avatar_image: z.optional(z.url()),
  gender: z.enum(Gender),
  roles: z.optional(RoleSchema.array()),
  professions: z.optional(ProfessionSchema.array()),
  appointments: z.optional(AppointmentSchema.array())
});

export type UserModel = z.infer<typeof UserSchema>;
