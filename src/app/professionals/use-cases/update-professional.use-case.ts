import { UpsertResponse } from "@/types/global";
import { ProfessionalServiceImpl } from "../services";
import { UserModel } from "@/app/users/models/user.model";
import { ProfessionalValidations } from "../validations";
import { UserDetailMapper } from "@/app/users/mappers/user-detail.mapper";

export class UpdateProfessionalUseCase {
  private readonly service: ProfessionalServiceImpl;

  constructor(service: ProfessionalServiceImpl) {
    this.service = service;
  }

  update = async (uid: string, body: unknown): Promise<UpsertResponse<UserModel>> => {
    const payload = ProfessionalValidations.validateUpdate(body);

    const existingProfessional = await this.service.findProfessionalRutAndEmail({
      rut: payload.rut,
      email: payload.email,
      uid: uid // Excluir al paciente actual de la búsqueda
      // TODO: revisar bien esto, para saber si el usuario existe o no antes de actualizar
    });

    if (existingProfessional?.rut === payload.rut) {
      ProfessionalValidations.ensureRutNotInUse(payload.rut);
    }
    if (existingProfessional?.email === payload.email) {
      ProfessionalValidations.ensureEmailNotInUse(payload.email);
    }

    const updatedProfessional = await this.service.updateProfessional(uid, payload);
    const professional = UserDetailMapper.map(updatedProfessional);

    return {
      message: `Professional actualizado(a)`,
      data: professional
    };
  };
}
