import { UpsertResponse } from "@/types/global";
import { UserDetailMapper } from "../mappers/user-detail.mapper";
import { UserServiceRepository } from "../repository";
import { UserValidations } from "../validations";
import { UserDetailModel } from "../models/user-detail.model";

export class UpdateUserRolesUseCase {
  private readonly service: UserServiceRepository;

  constructor(service: UserServiceRepository) {
    this.service = service;
  }

  updateRoles = async (uid: string, body: unknown): Promise<UpsertResponse<UserDetailModel>> => {
    const { roles } = UserValidations.validateRoleIds(body);

    const updatedUser = await this.service.updateRoles(uid, roles);
    const user = UserDetailMapper.map(updatedUser);

    return {
      data: user
    };
  };
}
