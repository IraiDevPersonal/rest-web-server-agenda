import { Request } from "express";
import { ProfessionalMapper } from "../mappers/professional-mapper";
import { ResponseWithPagination } from "@/types/global";
import { ProfessionalModel } from "../models/professional";
import { ProfessionalService } from "../service";
import { ProfessionalToFilterMapper } from "../mappers/professional-to-filter-mapper";
import { ProfessionalOptionModel } from "../models/professional-to-filter";

export class ProfessionalUseCases {
  constructor(private readonly service: ProfessionalService) {}

  getProfessionals = async (
    query: Request["query"]
  ): Promise<ResponseWithPagination<ProfessionalModel>> => {
    const filters = ProfessionalMapper.getFilters(query);
    const { data, ...pagination } = await this.service.getProfessionals(filters);

    return {
      ...pagination,
      data: ProfessionalMapper.response(data)
    };
  };

  getProfessionalsForFilters = async (
    query: Request["query"]
  ): Promise<ProfessionalOptionModel[]> => {
    const filters = ProfessionalMapper.getFilters(query);
    const bdProfessionals = await this.service.getProfessionalsForFilters(filters);

    return ProfessionalToFilterMapper.response(bdProfessionals);
  };
}
