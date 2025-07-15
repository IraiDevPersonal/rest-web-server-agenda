import { UndefinedObject } from "@/types/global";

export type PatientFilters = UndefinedObject<{
  rut: string;
  names: string;
  last_names: string;
  email: string;
}>;
