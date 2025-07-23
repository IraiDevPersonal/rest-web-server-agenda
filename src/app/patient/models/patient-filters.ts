import { UndefinedObject } from "@/types/global";

export type PatientFilters = UndefinedObject<{
  rut: string;
  name: string;
  email: string;
  is_deleted: boolean;
  page: number;
  limit: number;
}>;
