import { PatientHistoryForAppointmentDetailModel } from "./patient-history-for-appointment-detail.model";
import { PatientModel } from "./patient.model";

export type PatientForAppointmentDetailModel = Pick<
  PatientModel,
  "address" | "avatar_image" | "email" | "phone" | "rut" | "uid" | "names" | "last_names"
> & {
  history: PatientHistoryForAppointmentDetailModel[];
};
