import { UpsertResponse } from "@/types/global";
import { UserDetailMapper } from "../mappers/user-detail.mapper";
import { UserServiceRepository } from "../repository";
import { UserValidations } from "../validations";
import { UserDetailModel } from "../models/user-detail.model";

export class UpdateUserProfessionsUseCase {
  private readonly service: UserServiceRepository;

  constructor(service: UserServiceRepository) {
    this.service = service;
  }

  updateProfessions = async (uid: string, body: unknown): Promise<UpsertResponse<UserDetailModel>> => {
    const { professions } = UserValidations.validateProfessionIds(body);

    const updatedUser = await this.service.updateProfessions(uid, professions);
    const user = UserDetailMapper.map(updatedUser);

    return {
      data: user
    };
  };
}
