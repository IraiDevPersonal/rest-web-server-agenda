import type { AppointmentStatus } from "@prisma/client";

export type AppointmentFilters = Partial<{
  type: AppointmentStatus;
  professional_id: number;
  profession_id: number;
  patient_rut: string;
  date_from: Date;
  date_to: Date;
  date: Date;
}>;
