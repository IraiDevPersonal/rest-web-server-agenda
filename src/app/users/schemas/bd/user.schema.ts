import { ProfessionSchema } from "@/app/professions/schemas/bd/profession.schema";
import { RoleSchema } from "@/app/roles/schemas/bd/role.schema";
import { RutManager } from "@/lib/rut-manager";
import { ResponseWithPaginationSchema } from "@/lib/schemas/global";
import { UserStatus } from "@prisma/client";
import { z } from "zod";

export const UserSchema = z.object({
  uid: z.uuid(),
  email: z.email().min(1),
  phone: z.string().min(1),
  names: z.string().min(1),
  status: z.enum(UserStatus),
  address: z.string().min(3),
  password: z.string().min(1),
  last_names: z.string().min(1),
  avatar_image: z.url().nullable(),
  roles: z.object({ role: RoleSchema }).array(),
  professions: z.object({ profession: ProfessionSchema }).array(),
  rut: z.string().refine(RutManager.validate, { error: "invalid rut" })
});

export const UserBdWithPaginationSchema = ResponseWithPaginationSchema(UserSchema);