import type { PatientForAppointmentDetailModel } from "@/app/patients/models/patient-for-appointment-detail.model";
import type { ProfessionalForAppointmentDetailModel } from "@/app/professionals/models/professional-for-appointment-detail.model";
import type { AppointmentModel } from "./appointment.model";

export type AlertAppointmentDetailModel = {
  message: string;
  is_required: boolean;
};

export type AppointmentDetailModel = Pick<
  AppointmentModel,
  "uid" | "date" | "status" | "time_to" | "time_from" | "is_enabled"
> & {
  alert: AlertAppointmentDetailModel;
  patient: PatientForAppointmentDetailModel | null;
  professional: ProfessionalForAppointmentDetailModel;
};
