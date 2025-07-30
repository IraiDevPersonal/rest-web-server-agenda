import { UndefinedObject } from "@/types/global";
import { ScheduleStatus } from "@prisma/client";

export type AppointmentFilters = UndefinedObject<{
  type: ScheduleStatus;
  professional_id: number;
  profession_id: number;
  patient_rut: string;
  date_from: Date;
  date_to: Date;
  date: Date;
}>;
