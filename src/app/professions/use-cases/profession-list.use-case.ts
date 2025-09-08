import { queryParser } from "@/lib/utils";
import type { Request } from "express";
import { ProfessionForFiltersMapper } from "../mappers/profession-for-filters.mapper";
import { ProfessionMapper } from "../mappers/profession.mapper";
import type { ProfessionFilters } from "../models/profession-filters.model";
import type { ProfessionModel } from "../models/profession.model";
import type { ProfessionOptionModel } from "../models/professional-for-filters.model";
import type { ProfessionServiceRepository } from "../repository";

export class ProfessionListUseCases {
  private readonly service: ProfessionServiceRepository;

  constructor(service: ProfessionServiceRepository) {
    this.service = service;
  }

  list = async (query: Request["query"]): Promise<ProfessionModel[]> => {
    const filters = this.buildFilters(query);
    const bdProfessions = await this.service.getProfessions(filters);
    return ProfessionMapper.fromBdToDomain(bdProfessions);
  };

  listForFilters = async (): Promise<ProfessionOptionModel[]> => {
    const bdProfessions = await this.service.getProfessions();
    return ProfessionForFiltersMapper.fromBdToDomain(bdProfessions);
  };

  private buildFilters = (query: Request["query"]): ProfessionFilters => {
    const { id } = query;

    return queryParser({ id });
  };
}
