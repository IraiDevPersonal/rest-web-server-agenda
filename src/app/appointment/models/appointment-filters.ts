import { UndefinedObject } from "@/types/global";
import { AppointmentStatus } from "@prisma/client";

export type AppointmentFilters = UndefinedObject<{
  type: AppointmentStatus;
  professional_id: number;
  profession_id: number;
  patient_rut: string;
  date_from: Date;
  date_to: Date;
  date: Date;
}>;
