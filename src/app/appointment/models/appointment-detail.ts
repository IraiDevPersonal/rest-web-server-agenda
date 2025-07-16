import { AppointmentStatus } from "@prisma/client";
import { z } from "zod";

export const PatientHistoryAppointmentDetailSchema = z.object({
  uid: z.string().uuid("El UID debe ser un UUID válido"),
  date_time: z.string(),
  status: z.nativeEnum(AppointmentStatus)
});

export const ProfessionalAppointmentDetailSchema = z.object({
  full_name: z.string(),
  professions: z.array(z.string()),
  pay_methods: z.array(z.string()),
  confirm_methods: z.array(z.string())
});

export const PatientAppointmDetailMapperSchema = z.object({
  names: z.string(),
  last_names: z.string(),
  rut: z.string(),
  phone: z.string(),
  email: z.string(),
  address: z.string()
});

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
  status: z.nativeEnum(AppointmentStatus),
  patient_history: z.array(PatientHistoryAppointmentDetailSchema),
  professional: ProfessionalAppointmentDetailSchema,
  patient: PatientAppointmDetailMapperSchema,
  alert: AlertAppointmentDetailMapperSchema
});

export type PatientHistoryAppointmentDetailModel = z.infer<
  typeof PatientHistoryAppointmentDetailSchema
>;

export type ProfessionalAppointmentDetailModel = z.infer<
  typeof ProfessionalAppointmentDetailSchema
>;

export type PatientAppointmentDetailModel = z.infer<
  typeof PatientAppointmDetailMapperSchema
>;

export type AlertAppointmentDetailModel = z.infer<
  typeof AlertAppointmentDetailMapperSchema
>;

export type AppointmentDetailModel = z.infer<typeof AppointmentDetailSchema>;
