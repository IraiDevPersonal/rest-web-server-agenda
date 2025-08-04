export type PatientFilters = Partial<{
  rut: string;
  name: string;
  email: string;
  is_deleted: boolean;
  page: number;
  limit: number;
}>;
