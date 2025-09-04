import { capitalize } from "@/lib/utils";
import { UpsertResponse } from "@/types/global";
import { UserStatus } from "@prisma/client";
import { UserServiceRepository } from "../repository";
import { UserValidations } from "../validations";
import { UserModel } from "../models/user.model";
import { UserDetailMapper } from "../mappers/user-detail.mapper";

export class CreateUserUseCase {
  private readonly service: UserServiceRepository;

  constructor(service: UserServiceRepository) {
    this.service = service;
  }

  create = async (body: unknown): Promise<UpsertResponse<UserModel>> => {
    const payload = UserValidations.validateInsert(body);

    const existingUser = await this.service.findByRutOrEmail({
      rut: payload.rut,
      email: payload.email
    });

    if (existingUser?.rut === payload.rut) {
      UserValidations.ensureRutNotInUse(payload.rut);
    }
    if (existingUser?.email === payload.email) {
      UserValidations.ensureEmailNotInUse(payload.email);
    }

    const createdUser = await this.service.create({
      ...payload,
      status: UserStatus.ACTIVE
    });
    const user = UserDetailMapper.fromBdToDomain(createdUser);

    return {
      message: `Usuario ${capitalize(user.names)} ${capitalize(user.last_names)} creado(a)`,
      data: user
    };
  };
}
