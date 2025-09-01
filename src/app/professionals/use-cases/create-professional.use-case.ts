import { capitalize } from "@/lib/utils";
import { UpsertResponse } from "@/types/global";
import { UserStatus } from "@prisma/client";
import { ProfessionalServiceImpl } from "../services";
import { UserModel } from "@/app/users/models/user.model";
import { ProfessionalValidations } from "../validations";
import { UserDetailMapper } from "@/app/users/mappers/user-detail.mapper";

export class CreateProfessionalUseCase {
  private readonly service: ProfessionalServiceImpl;

  constructor(service: ProfessionalServiceImpl) {
    this.service = service;
  }

  create = async (body: unknown): Promise<UpsertResponse<UserModel>> => {
    const payload = ProfessionalValidations.validateInsert(body);

    const existingProfessional = await this.service.findProfessionalRutAndEmail({
      rut: payload.rut,
      email: payload.email
    });

    if (existingProfessional?.rut === payload.rut) {
      ProfessionalValidations.ensureRutNotInUse(payload.rut);
    }
    if (existingProfessional?.email === payload.email) {
      ProfessionalValidations.ensureEmailNotInUse(payload.email);
    }

    const createdProfessional = await this.service.createProfessional({
      ...payload,
      status: UserStatus.ACTIVE
    });
    const user = UserDetailMapper.fromBdToDomain(createdProfessional);

    return {
      message: `Professional ${capitalize(user.names)} ${capitalize(user.last_names)} creado(a)`,
      data: user
    };
  };
}
