import { UserStatus } from "@prisma/client";

export type PatientFilters = Partial<{
  rut: string;
  name: string;
  email: string;
  status: UserStatus;
  page: number;
  limit: number;
}>;
