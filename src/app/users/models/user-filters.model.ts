import { PaginatedQuery } from "@/types/global";

export type UserFilters = Partial<{
  profession_id: number;
  last_names: string;
  names: string;
  limit: number;
  page: number;
  rut: string;
  id: number;
}>;

export type PaginatedUserQueryFilters = PaginatedQuery<Omit<UserFilters, "page" | "limit">>;
