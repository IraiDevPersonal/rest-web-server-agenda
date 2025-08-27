import { ProfessionalMapper } from "../mappers/professional.mapper";
import { ProfessionalModel } from "../models/professional.model";
import { ProfessionalServiceImpl } from "../service";
import { ProfessionalValidations } from "../validations/professional-validations";

export class ProfessionalDetailUseCase {
  private readonly service: ProfessionalServiceImpl;

  constructor(service: ProfessionalServiceImpl) {
    this.service = service;
  }

  getDetail = async (
    uid: string
  ): Promise<{
    data: ProfessionalModel;
    blocks: any[];
  }> => {
    const bdProfessional = await this.service.getProfessionalByUid(uid);
    const validProfessional = ProfessionalValidations.exists(bdProfessional, uid);
    const professional = ProfessionalMapper.map(validProfessional);

    return {
      data: professional,
      blocks: []
    };
  };
}
