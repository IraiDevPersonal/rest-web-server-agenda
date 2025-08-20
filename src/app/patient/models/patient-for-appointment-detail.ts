import { PatientModel } from "./patient";

export type PatientForAppointmentDetailModel = Pick<
  PatientModel,
  "address" | "avatar_image" | "email" | "names" | "phone" | "rut" | "last_names" | "uid"
>;
