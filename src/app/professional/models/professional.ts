import { z } from "zod";

import { ProfessionSchema } from "@/app/profession/models/profession";
import { RoleSchema } from "@/app/role/models/role";

export const ProfessionalSchema = z.object({
  id: z.bigint().positive().optional(),
  user_id: z.bigint().positive(),
  uid: z.string().uuid(),
  rut: z.string(),
  names: z.string(),
  last_names: z.string(),
  phone: z.string(),
  address: z.string(),
  avatar_image: z.string().optional().nullable(),
  email: z.string().email().optional(),
  role: RoleSchema,
  professions: z.array(ProfessionSchema)
});

export const ProfessionalForAppointmentDetailSchema = z.object({
  fullname: z.string(),
  professions: z.array(z.string()),
  pay_methods: z.array(z.string()),
  confirm_methods: z.array(z.string())
});

export type ProfessionalModel = z.infer<typeof ProfessionalSchema>;
export type ProfessionalForAppointmentDetailModel = z.infer<
  typeof ProfessionalForAppointmentDetailSchema
>;
