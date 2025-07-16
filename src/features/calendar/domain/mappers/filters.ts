import { AppointmentStatus } from '@prisma/client';

export interface GetCalendarFilter {
  type?: AppointmentStatus;
  year_month?: string;
  patient_rut?: string;
  professional_id?: number;
  profession_id?: number;
  date_from?: Date;
  date_to?: Date;
}
