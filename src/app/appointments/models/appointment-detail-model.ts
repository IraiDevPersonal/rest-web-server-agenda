import { PatientHistoryForAppointmentDetailModel } from "@/app/patient/models/patient";
import { PatientForAppointmentDetailModel } from "@/app/patient/models/patient-for-appointment-detail";
import { ProfessionalForAppointmentDetailModel } from "@/app/professional/models/professional-for-appointment-detail";

export type AlertAppointmentDetailModel = {
  message: string;
  is_required: boolean;
};

export type AppointmentDetailModel = {
  uid: string;
  date: string;
  status: string;
  time_to: string;
  time_from: string;
  is_enabled: boolean;
  alert: AlertAppointmentDetailModel;
  patient: PatientForAppointmentDetailModel | null;
  professional: ProfessionalForAppointmentDetailModel;
  patient_history: PatientHistoryForAppointmentDetailModel[];
};
