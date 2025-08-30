import { ProfessionalDetailMapper } from "../mappers/professional-detail.mapper";
import { ProfessionalModel } from "../models/professional.model";
import { ProfessionalServiceImpl } from "../service";
import { ProfessionalValidations } from "../validations";

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
    const validProfessional = ProfessionalValidations.requireExists(bdProfessional);
    const professional = ProfessionalDetailMapper.map(validProfessional);

    return {
      data: professional,
      blocks: []
    };
  };
}
