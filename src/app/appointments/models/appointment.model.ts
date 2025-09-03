import { AppointmentStatus } from "@prisma/client";
import { PatientForAppointmentModel } from "../../patients/models/patient-for-appointment.model";
import { ProfessionalForAppointmentModel } from "../../professionals/models/professional-for-appointment.model";

export type AppointmentModel = {
  uid: string;
  date: string;
  time_to: string;
  time_from: string;
  is_enabled: boolean;
  status: AppointmentStatus;
  patient: PatientForAppointmentModel | null;
  professional: ProfessionalForAppointmentModel;
};
