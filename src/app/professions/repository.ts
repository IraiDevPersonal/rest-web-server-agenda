import { ProfessionFilters } from "./models/profession-filters.model";

export type ProfessionServiceRepository = {
  getProfessions: (filters?: ProfessionFilters) => Promise<unknown>;
};
