import { UpsertResponse } from "@/types/global";
import { UserStatus } from "@prisma/client";
import { UserDetailMapper } from "../mappers/user-detail.mapper";
import { UserModel } from "../models/user.model";
import { UserServiceRepository } from "../repository";
import { UserValidations } from "../validations";

export class UpdateUserStatusUseCase {
  private readonly service: UserServiceRepository;
  private readonly HASH_STATUS: Record<UserStatus, string> = {
    ACTIVE: "habilitado",
    INACTIVE: "deshabilitado",
    BLOCKED: "bloqueado"
  };

  constructor(service: UserServiceRepository) {
    this.service = service;
  }

  updateStatus = async (uid: string, body: unknown): Promise<UpsertResponse<UserModel>> => {
    const { status } = UserValidations.validateUpdateStatusPayload(body);
    const bgUser = await this.service.getByUid(uid);
    const validUser = UserDetailMapper.fromBdToDomain(UserValidations.requireExists(bgUser));

    const updatedUser = await this.service.update(uid, {
      status: status
        ? status
        : validUser.status === UserStatus.ACTIVE
          ? UserStatus.INACTIVE
          : UserStatus.ACTIVE
    });
    const user = UserDetailMapper.map(updatedUser);

    return {
      data: user
    };
  };
}
