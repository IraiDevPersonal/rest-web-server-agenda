import { queryParser } from "@/lib/utils";
import { Request } from "express";
import { ProfessionalForFiltersMapper } from "../mappers/professional-for-filters.mapper";
import { ProfessionalMapper } from "../mappers/professional.mapper";
import { ProfessionalFilters } from "../models/professional-filters.model";
import { ProfessionalServiceImpl } from "../service";

export class ProfessionalListUseCase {
  private readonly service: ProfessionalServiceImpl;

  constructor(service: ProfessionalServiceImpl) {
    this.service = service;
  }

  list = async (query: Request["query"]) => {
    const filters = this.buildFilters(query);
    const response = await this.service.getProfessionals(filters);
    const data = ProfessionalMapper.fromBdToDomain(response);

    return data;
  };

  listForFilters = async (query: Request["query"]) => {
    const filters = this.buildFilters(query);
    const bdProfessionals = await this.service.getProfessionalsForFilters(filters);

    return ProfessionalForFiltersMapper.fromBdToDomain(bdProfessionals);
  };

  private buildFilters = (query: Request["query"]): ProfessionalFilters => {
    const { id, names, last_names, profession_id, rut, page, limit } = query;

    return queryParser(
      { id, names, last_names, profession_id, rut, page, limit },
      { limit: "10", page: "1" }
    );
  };
}
