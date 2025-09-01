import { AppointmentStatus } from "@prisma/client";

export type PatientHistoryForAppointmentDetailModel = {
  uid: string;
  date_time: string;
  status: AppointmentStatus;
};
