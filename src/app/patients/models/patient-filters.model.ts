import { UserStatus } from "@prisma/client";

export type PatientFilters = Partial<{
  rut: string;
  name: string;
  email: string;
  page: number;
  limit: number;
  status: UserStatus;
}>;
