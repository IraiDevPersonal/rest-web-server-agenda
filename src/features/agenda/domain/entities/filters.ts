import { AppointmentStatus } from '@prisma/client';

export interface GetMyDayFilter {
  type?: AppointmentStatus;
  date?: Date;
  date_from?: Date;
  date_to?: Date;
  patient_rut?: string;
  professional_id?: number;
  profession_id?: number;
}
