import { UserFilters } from "../users/models/user-filters.model";
import { UserServiceRepository } from "../users/repository";

export type ProfessionalServiceRepository = UserServiceRepository & {
  getForFilters: (filters: Pick<UserFilters, "profession_id">) => Promise<unknown[]>;
};
