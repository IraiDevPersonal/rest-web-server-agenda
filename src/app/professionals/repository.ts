import type { UserFilters } from "../users/models/user-filters.model";
import type { UserServiceRepository } from "../users/repository";

export type ProfessionalServiceRepository = UserServiceRepository & {
  getForFilters: (filters: Pick<UserFilters, "profession_id">) => Promise<unknown[]>;
};
