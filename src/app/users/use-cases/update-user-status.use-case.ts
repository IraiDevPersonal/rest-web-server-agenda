import { UpsertResponse } from "@/types/global";
import { UserServiceRepository } from "../repository";
import { UserValidations } from "../validations";
import { UserStatus } from "@prisma/client";
import { capitalize } from "@/lib/utils";
import { UserModel } from "../models/user.model";
import { UserDetailMapper } from "../mappers/user-detail.mapper";

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
    const { status } = UserValidations.validateUpdateStatus(body);
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
      data: user,
      message: `Usuario ${capitalize(user.names)} ${capitalize(user.last_names)} ha sido ${this.HASH_STATUS[user.status]}`
    };
  };
}
