import { UpsertResponse } from "@/types/global";
import { ProfessionalValidations } from "../validations";
import { capitalize } from "@/lib/utils";
import { ProfessionalServiceImpl } from "../services";
import { UserModel } from "@/app/users/models/user.model";
import { UserDetailMapper } from "@/app/users/mappers/user-detail.mapper";
import { UserStatus } from "@prisma/client";

export class UpdateProfessionalStatusUseCase {
  private readonly service: ProfessionalServiceImpl;
  private readonly HASH_STATUS: Record<UserStatus, string> = {
    ACTIVE: "habilitado",
    INACTIVE: "deshabilitado",
    BLOCKED: "bloqueado"
  };

  constructor(service: ProfessionalServiceImpl) {
    this.service = service;
  }

  updateStatus = async (uid: string, body: unknown): Promise<UpsertResponse<UserModel>> => {
    const { status } = ProfessionalValidations.validateUpdateStatus(body);
    const bgProfessional = await this.service.getProfessionalByUid(uid);
    const validProfessional = UserDetailMapper.fromBdToDomain(
      ProfessionalValidations.requireExists(bgProfessional)
    );

    const updatedProfessional = await this.service.updateProfessional(uid, {
      status: status
        ? status
        : validProfessional.status === UserStatus.ACTIVE
          ? UserStatus.INACTIVE
          : UserStatus.ACTIVE
    });
    const user = UserDetailMapper.map(updatedProfessional);

    return {
      data: user,
      message: `Professional ${capitalize(user.names)} ${capitalize(user.last_names)} ha sido ${this.HASH_STATUS[user.status]}`
    };
  };
}
