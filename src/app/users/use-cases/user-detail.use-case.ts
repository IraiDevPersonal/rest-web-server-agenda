import { UserDetailMapper } from "../mappers/user-detail.mapper";
import { UserModel } from "../models/user.model";
import { UserServiceImpl } from "../service";
import { UserValidations } from "../validations";

export class UserDetailUseCase {
  private readonly service: UserServiceImpl;

  constructor(service: UserServiceImpl) {
    this.service = service;
  }

  getDetail = async (
    uid: string
  ): Promise<{
    data: UserModel;
    blocks: any[];
  }> => {
    const bdUser = await this.service.getUserByUid(uid);
    const validUser = UserValidations.requireExists(bdUser);
    const user = UserDetailMapper.map(validUser);

    return {
      data: user,
      blocks: []
    };
  };
}