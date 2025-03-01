import { AppointmentStatus } from "@prisma/client";

export interface GetCalendarFilter {
  type?: AppointmentStatus;
  date?: Date;
  patient_rut?: string;
  professional_id?: number;
  profession_id?: number;
}
