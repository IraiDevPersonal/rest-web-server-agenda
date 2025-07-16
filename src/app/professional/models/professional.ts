import { z } from "zod";

import { ProfessionSchema } from "@/app/profession/models/profession";
import { RoleSchema } from "@/app/role/models/role";

export const ProfessionalSchema = z.object({
  id: z.bigint().positive().nullable(),
  uid: z.string().uuid(),
  rut: z.string(),
  names: z.string(),
  last_names: z.string(),
  phone: z.string(),
  email: z.string().email(),
  role: RoleSchema,
  professions: z.array(ProfessionSchema)
});

export const ProfessionalForAppointmentDetailSchema = z.object({
  full_name: z.string(),
  professions: z.array(z.string()),
  pay_methods: z.array(z.string()),
  confirm_methods: z.array(z.string())
});

export type ProfessionalModel = z.infer<typeof ProfessionalSchema>;
export type ProfessionalForAppointmentDetailModel = z.infer<
  typeof ProfessionalForAppointmentDetailSchema
>;
