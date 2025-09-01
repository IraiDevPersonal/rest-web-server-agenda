import { UpsertResponse } from "@/types/global";
import { UserServiceImpl } from "../service";
import { UserValidations } from "../validations";
import { UserModel } from "../models/user.model";
import { UserDetailMapper } from "../mappers/user-detail.mapper";

export class UpdateUserUseCase {
  private readonly service: UserServiceImpl;

  constructor(service: UserServiceImpl) {
    this.service = service;
  }

  update = async (uid: string, body: unknown): Promise<UpsertResponse<UserModel>> => {
    const payload = UserValidations.validateUpdate(body);

    const existingUser = await this.service.findUserRutAndEmail({
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

    const updatedUser = await this.service.updateUser(uid, payload);
    const user = UserDetailMapper.map(updatedUser);

    return {
      message: `User actualizado(a)`,
      data: user
    };
  };
}