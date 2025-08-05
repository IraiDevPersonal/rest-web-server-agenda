import { Request } from "express";
import { ProfessionMapper } from "../mappers/profession-mapper";
import { ProfessionService } from "../service";
import { ProfessionModel } from "../models/profession";
import { ProfessionOptionModel } from "../models/professional-for-filters";
import { ProfessionForFiltersMapper } from "../mappers/profession-for-filters-mapper";

export class ProfessionUseCases {
  constructor(private readonly service: ProfessionService) {}

  getProfessions = async (query: Request["query"]): Promise<ProfessionModel[]> => {
    const filters = ProfessionMapper.getFilters(query);
    const bdProfessions = await this.service.getProfessions(filters);
    return ProfessionMapper.response(bdProfessions);
  };

  getProfessionsForFilters = async (
    query: Request["query"]
  ): Promise<ProfessionOptionModel[]> => {
    const filters = ProfessionMapper.getFilters(query);
    const bdProfessions = await this.service.getProfessions(filters);
    return ProfessionForFiltersMapper.response(bdProfessions);
  };
}
