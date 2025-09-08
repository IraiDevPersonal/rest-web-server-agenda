import { UserListUseCase } from "@/app/users/use-cases/user-list.use-case";
import type { Request } from "express";
import { ProfessionalForFiltersMapper } from "../mappers/professional-for-filters.mapper";
import type { ProfessionalServiceRepository } from "../repository";

export class ProfessionalListUseCase extends UserListUseCase<ProfessionalServiceRepository> {
  constructor(service: ProfessionalServiceRepository) {
    super(service);
  }

  listForFilters = async (query: Request["query"]) => {
    const filters = this.buildFilters(query);
    const bdProfessionals = await this.service.getForFilters({
      profession_id: filters.profession_id
    });

    return ProfessionalForFiltersMapper.fromBdToDomain(bdProfessionals);
  };
}
