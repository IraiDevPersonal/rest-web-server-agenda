import { z } from "zod";

import { ProfessionSchema } from "@/app/profession/models/profession";
import { RoleSchema } from "@/app/role/models/role";
import { ServiceProviderScheme } from "@/app/service-provider/models/service-provider";

export const ProfessionalSchema = z.object({
  id: z.number().positive().optional(),
  user_id: z.bigint().positive(),
  uid: z.string().uuid(),
  rut: z.string(),
  names: z.string(),
  last_names: z.string(),
  phone: z.string(),
  email: z.string().email().optional(),
  role: RoleSchema,
  professions: z.array(ProfessionSchema),
  service_provider: z.optional(ServiceProviderScheme)
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
