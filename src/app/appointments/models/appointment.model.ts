import { AppointmentStatus } from "@prisma/client";
import { PatientForAppointmentModel } from "../../patients/models/patient-for-appointment.model";
import { UserForAppointmentModel } from "../../users/models/user-for-appointment.model";

export type AppointmentModel = {
  uid: string;
  date: string;
  time_to: string;
  time_from: string;
  appointment_status: AppointmentStatus;
  professional: UserForAppointmentModel;
  patient: PatientForAppointmentModel | null;
};
