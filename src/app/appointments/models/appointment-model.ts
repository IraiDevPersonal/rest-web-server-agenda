import { AppointmentStatus } from "@prisma/client";
import { PatientForAppointment } from "../../patient/models/patient-for-appointment";
import { ProfessionalForAppointment } from "../../professional/models/professional-for-appointment";

export type AppointmentModel = {
  uid: string;
  date: string;
  time_to: string;
  time_from: string;
  appointment_status: AppointmentStatus;
  patient: PatientForAppointment | null;
  professional: ProfessionalForAppointment;
};
