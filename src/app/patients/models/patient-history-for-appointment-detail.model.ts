import { AppointmentStatus } from "@prisma/client";

export type PatientHistoryForAppointmentDetailModel = {
  uid: string;
  date: string;
  time_to: string;
  time_from: string;
  status: AppointmentStatus;
};
