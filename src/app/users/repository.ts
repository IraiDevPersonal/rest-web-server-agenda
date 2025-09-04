import { MakeRequired, PaginatedResult, RutOrEmailQuery } from "@/types/global";
import { UpsertUserPayload } from "./models/user-payload.model";
import { PaginatedUserQueryFilters } from "./models/user-filters.model";

export type UserServiceRepository = {
  getByUid: (uid: string) => Promise<unknown | null>;
  create: (payload: UpsertUserPayload) => Promise<unknown>;
  updateRoles: (uid: string, roleIds: number[]) => Promise<unknown>;
  getAll: (filters: PaginatedUserQueryFilters) => Promise<PaginatedResult>;
  updateProfessions: (uid: string, professionIds: number[]) => Promise<unknown>;
  update: (uid: string, payload: Partial<UpsertUserPayload>) => Promise<unknown>;
  findByRutOrEmail: (args: RutOrEmailQuery) => Promise<MakeRequired<RutOrEmailQuery, "uid"> | null>;
};
