import { PatientHistoryForAppointmentDetailModel } from "@/app/patients/models/patient-history-for-appointment-detail.model";
import { PatientForAppointmentDetailModel } from "@/app/patients/models/patient-for-appointment-detail.model";
import { UserForAppointmentDetailModel } from "@/app/users/models/user-for-appointment-detail.model";

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
  professional: UserForAppointmentDetailModel;
  patient: PatientForAppointmentDetailModel | null;
  patient_history: PatientHistoryForAppointmentDetailModel[];
};
