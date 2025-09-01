import { PatientModel } from "./patient.model";

export type PatientForAppointmentDetailModel = Pick<
  PatientModel,
  "address" | "avatar_image" | "email" | "names" | "phone" | "rut" | "last_names" | "uid"
>;
