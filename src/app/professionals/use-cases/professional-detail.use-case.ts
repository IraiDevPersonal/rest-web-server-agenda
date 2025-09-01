import { UserDetailMapper } from "@/app/users/mappers/user-detail.mapper";
import { ProfessionalValidations } from "../validations";
import { UserModel } from "@/app/users/models/user.model";
import { ProfessionalServiceImpl } from "../services";

export class ProfessionalDetailUseCase {
  private readonly service: ProfessionalServiceImpl;

  constructor(service: ProfessionalServiceImpl) {
    this.service = service;
  }

  getDetail = async (
    uid: string
  ): Promise<{
    data: UserModel;
    blocks: any[];
  }> => {
    const bdProfessional = await this.service.getProfessionalByUid(uid);
    const validProfessional = ProfessionalValidations.requireExists(bdProfessional);
    const professional = UserDetailMapper.map(validProfessional);

    return {
      data: professional,
      blocks: []
    };
  };
}
