import { ResponseWithPagination } from "@/types/global";
import { Request } from "express";
import { ProfessionalForFiltersMapper } from "../mappers/professional-for-filters-mapper";
import { ProfessionalMapper } from "../mappers/professional-mapper";
import { ProfessionalModel } from "../models/professional";
import { ProfessionalOptionModel } from "../models/professional-to-filter";
import { ProfessionalService } from "../service";
import { ProfessionalValidations } from "../validations/professional-validations";

export class ProfessionalUseCases {
  constructor(private readonly service: ProfessionalService) {}

  private _getAndValidateProfessional = async (uid: string): Promise<any> => {
    const professional = await this.service.getProfessionalDetail(uid);
    return ProfessionalValidations.exists(professional, uid);
  };

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

  getProfessionalDetail = async (
    uid: string
  ): Promise<{
    data: ProfessionalModel;
    blocks: any[];
  }> => {
    const result = await this._getAndValidateProfessional(uid);
    const professional = ProfessionalMapper.validate(result);

    return {
      data: professional,
      blocks: []
    };
  };

  getProfessionalsForFilters = async (
    query: Request["query"]
  ): Promise<ProfessionalOptionModel[]> => {
    const filters = ProfessionalMapper.getFilters(query);
    const bdProfessionals = await this.service.getProfessionalsForFilters(filters);

    return ProfessionalForFiltersMapper.response(bdProfessionals);
  };
}
