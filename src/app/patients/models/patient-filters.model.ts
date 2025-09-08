import type { PaginatedQuery } from "@/types/global";
import type { UserStatus } from "@prisma/client";

export type PatientFilters = Partial<{
  rut: string;
  name: string;
  email: string;
  page: number;
  limit: number;
  status: UserStatus;
}>;

export type PaginatedPatientQueryFilters = PaginatedQuery<Omit<PatientFilters, "page" | "limit">>;
