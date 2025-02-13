import { AppointmentStatus } from "@prisma/client";

export interface GetMyDayFilter {
  type?: AppointmentStatus;
  date?: Date;
  patient_rut?: string;
}
