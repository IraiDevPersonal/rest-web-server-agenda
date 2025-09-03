import { PatientHistoryForAppointmentDetailModel } from "./patient-history-for-appointment-detail.model";
import { PatientModel } from "./patient.model";

export type PatientForAppointmentDetailModel = Pick<
  PatientModel,
  "address" | "avatar_image" | "email" | "phone" | "rut" | "uid"
> & {
  full_name: string;
  history: PatientHistoryForAppointmentDetailModel[];
};
