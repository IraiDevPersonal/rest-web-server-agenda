import { UpsertResponse } from "@/types/global";
import { UserDetailMapper } from "../mappers/user-detail.mapper";
import { UserModel } from "../models/user.model";
import { UserServiceRepository } from "../repository";
import { UserValidations } from "../validations";

export class UpdateUserUseCase {
  private readonly service: UserServiceRepository;

  constructor(service: UserServiceRepository) {
    this.service = service;
  }

  update = async (uid: string, body: unknown): Promise<UpsertResponse<UserModel>> => {
    const payload = UserValidations.validateUpdatePayload(body);

    const existingUser = await this.service.findByRutOrEmail({
      rut: payload.rut,
      email: payload.email,
      uid: uid // Excluir al paciente actual de la búsqueda
      // TODO: revisar bien esto, para saber si el usuario existe o no antes de actualizar
    });

    if (existingUser?.rut === payload.rut) {
      UserValidations.ensureRutNotInUse(payload.rut);
    }
    if (existingUser?.email === payload.email) {
      UserValidations.ensureEmailNotInUse(payload.email);
    }

    const updatedUser = await this.service.update(uid, payload);
    const user = UserDetailMapper.map(updatedUser);

    return {
      data: user
    };
  };
}
