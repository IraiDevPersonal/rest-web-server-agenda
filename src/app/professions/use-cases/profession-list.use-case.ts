import { queryParser } from "@/lib/utils";
import { Request } from "express";
import { ProfessionForFiltersMapper } from "../mappers/profession-for-filters.mapper";
import { ProfessionMapper } from "../mappers/profession.mapper";
import { ProfessionFilters } from "../models/profession-filters.model";
import { ProfessionModel } from "../models/profession.model";
import { ProfessionOptionModel } from "../models/professional-for-filters.model";
import { ProfessionServiceImpl } from "../service";

export class ProfessionListUseCase {
  private readonly service: ProfessionServiceImpl;

  constructor(service: ProfessionServiceImpl) {
    this.service = service;
  }

  list = async (query: Request["query"]): Promise<ProfessionModel[]> => {
    const filters = this.buildFilters(query);
    const bdProfessions = await this.service.getProfessions(filters);
    return ProfessionMapper.fromBdToDomain(bdProfessions);
  };

  listForFilters = async (query: Request["query"]): Promise<ProfessionOptionModel[]> => {
    const filters = this.buildFilters(query);
    const bdProfessions = await this.service.getProfessions(filters);
    return ProfessionForFiltersMapper.fromBdToDomain(bdProfessions);
  };

  private buildFilters = (query: Request["query"]): ProfessionFilters => {
    const { id } = query;

    return queryParser({ id });
  };
}
