import { z } from "zod";
import { UpsertAppointmentSchema } from "../schemas/upsert-appointment-schema";
import { AppointmentStatus } from "@prisma/client";

export type AppointmentModel = {
  uid: string;
  date: string;
  time_to: string;
  time_from: string;
  appointment_status: AppointmentStatus;
  patient: PatientForAppointment | null;
  professional: ProfessionalForAppointment;
};
export type UpsertAppointmentValues = z.infer<typeof UpsertAppointmentSchema>;

export type ProfessionalForAppointment = {
  professions: string[];
  full_name: string;
};

export type PatientForAppointment = {
  full_name: string;
  rut: string;
  phone: string;
};
