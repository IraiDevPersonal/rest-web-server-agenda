import { MakeRequired, PaginatedResult, RutOrEmailQuery } from "@/types/global";
import { UpsertUserPayload } from "./models/user-payload.model";

export type UserServiceRepository<TFilters extends object> = {
  getByUid: (uid: string) => Promise<unknown | null>;
  getAll: (filters: TFilters) => Promise<PaginatedResult>;
  create: (payload: UpsertUserPayload) => Promise<unknown>;
  updateRoles: (uid: string, roleIds: number[]) => Promise<unknown>;
  updateProfessions: (uid: string, professionIds: number[]) => Promise<unknown>;
  update: (uid: string, payload: Partial<UpsertUserPayload>) => Promise<unknown>;
  findByRutOrEmail: (args: RutOrEmailQuery) => Promise<MakeRequired<RutOrEmailQuery, "uid"> | null>;
};
