import { UserDetailMapper } from "../mappers/user-detail.mapper";
import { UserModel } from "../models/user.model";
import { UserServiceRepository } from "../repository";
import { UserValidations } from "../validations";

export class UserDetailUseCase {
  private readonly service: UserServiceRepository;

  constructor(service: UserServiceRepository) {
    this.service = service;
  }

  getDetail = async (uid: string): Promise<{ data: UserModel }> => {
    const bdUser = await this.service.getByUid(uid);
    const validUser = UserValidations.requireExists(bdUser);
    const user = UserDetailMapper.map(validUser);

    return {
      data: user
    };
  };
}
