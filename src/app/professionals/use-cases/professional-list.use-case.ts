import { UserMapper } from "@/app/users/mappers/user.mapper";
import { UserFilters } from "@/app/users/models/user-filters.model";
import { Pagination } from "@/lib/pagination";
import { queryParser } from "@/lib/utils";
import { Request } from "express";
import { ProfessionalForFiltersMapper } from "../mappers/professional-for-filters.mapper";
import { ProfessionalServiceImpl } from "../services";

export class ProfessionalListUseCase {
  private readonly service: ProfessionalServiceImpl;

  constructor(service: ProfessionalServiceImpl) {
    this.service = service;
  }

  list = async (query: Request["query"]) => {
    const { page, limit, ...filters } = this.buildFilters(query);
    const pagination = new Pagination({ page, limit });

    const { data, total } = await this.service.getProfessionals(pagination.withFilters(filters));

    return UserMapper.fromBdToDomain({
      data,
      total,
      page: pagination.page,
      limit: pagination.limit,
      pages: pagination.getTotalPages(total)
    });
  };

  listForFilters = async (query: Request["query"]) => {
    const filters = this.buildFilters(query);
    const bdProfessionals = await this.service.getProfessionalsForFilters({
      profession_id: filters.profession_id
    });

    return ProfessionalForFiltersMapper.fromBdToDomain(bdProfessionals);
  };

  private buildFilters = (query: Request["query"]): UserFilters => {
    const { id, names, last_names, profession_id, rut, page, limit } = query;

    return queryParser(
      { id, names, last_names, profession_id, rut, page, limit },
      { limit: "10", page: "1" }
    );
  };
}
