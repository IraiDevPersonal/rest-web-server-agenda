import type { UpsertResponse } from "@/types/global";
import { UserStatus } from "@prisma/client";
import { UserDetailMapper } from "../mappers/user-detail.mapper";
import type { UserDetailModel } from "../models/user-detail.model";
import type { UserServiceRepository } from "../repository";
import { UserValidations } from "../validations";

export class CreateUserUseCase {
  private readonly service: UserServiceRepository;

  constructor(service: UserServiceRepository) {
    this.service = service;
  }

  create = async (body: unknown): Promise<UpsertResponse<UserDetailModel>> => {
    const payload = UserValidations.validateInsertPayload(body);

    const existingUser = await this.service.findByRutOrEmail({
      rut: payload.rut,
      email: payload.email,
    });

    if (existingUser?.rut === payload.rut) {
      UserValidations.ensureRutNotInUse(payload.rut);
    }
    if (existingUser?.email === payload.email) {
      UserValidations.ensureEmailNotInUse(payload.email);
    }

    const createdUser = await this.service.create({
      ...payload,
      status: UserStatus.ACTIVE,
    });
    const user = UserDetailMapper.fromBdToDomain(createdUser);

    return {
      data: user,
    };
  };
}
