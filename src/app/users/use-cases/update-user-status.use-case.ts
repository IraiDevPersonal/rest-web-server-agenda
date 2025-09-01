import { UpsertResponse } from "@/types/global";
import { UserServiceImpl } from "../service";
import { UserValidations } from "../validations";
import { UserStatus } from "@prisma/client";
import { capitalize } from "@/lib/utils";
import { UserModel } from "../models/user.model";
import { UserDetailMapper } from "../mappers/user-detail.mapper";

export class UpdateUserStatusUseCase {
  private readonly service: UserServiceImpl;
  private readonly HASH_STATUS: Record<UserStatus, string> = {
    ACTIVE: "habilitado",
    INACTIVE: "deshabilitado",
    BLOCKED: "bloqueado"
  };

  constructor(service: UserServiceImpl) {
    this.service = service;
  }

  updateStatus = async (uid: string, body: unknown): Promise<UpsertResponse<UserModel>> => {
    const { status } = UserValidations.validateUpdateStatus(body);
    const bgUser = await this.service.getUserByUid(uid);
    const validUser = UserDetailMapper.fromBdToDomain(
      UserValidations.requireExists(bgUser)
    );

    const updatedUser = await this.service.updateUser(uid, {
      status: status
        ? status
        : validUser.status === UserStatus.ACTIVE
          ? UserStatus.INACTIVE
          : UserStatus.ACTIVE
    });
    const user = UserDetailMapper.map(updatedUser);

    return {
      data: user,
      message: `User ${capitalize(user.names)} ${capitalize(user.last_names)} ha sido ${this.HASH_STATUS[user.status]}`
    };
  };
}