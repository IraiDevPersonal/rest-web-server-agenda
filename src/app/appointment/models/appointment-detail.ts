import {
  PatientForAppointmentDetailSchema,
  PatientHistoryForAppointmentDetailSchema
} from "@/app/patient/models/patient";
import { ProfessionalForAppointmentDetailSchema } from "@/app/professional/models/professional";
import { ScheduleStatus } from "@prisma/client";
import { z } from "zod";

export const AlertAppointmentDetailMapperSchema = z.object({
  message: z.string(),
  is_required: z.boolean()
});

export const AppointmentDetailSchema = z.object({
  uid: z.string().uuid("El UID debe ser un UUID válido"),
  date: z.string(),
  time_from: z.string(),
  time_to: z.string(),
  is_enabled: z.boolean(),
  status: z.nativeEnum(ScheduleStatus),
  patient_history: z.array(PatientHistoryForAppointmentDetailSchema),
  professional: ProfessionalForAppointmentDetailSchema,
  patient: PatientForAppointmentDetailSchema,
  alert: AlertAppointmentDetailMapperSchema
});

export type AlertAppointmentDetailModel = z.infer<
  typeof AlertAppointmentDetailMapperSchema
>;

export type AppointmentDetailModel = z.infer<typeof AppointmentDetailSchema>;
