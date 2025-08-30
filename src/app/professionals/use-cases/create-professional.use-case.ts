import { capitalize } from "@/lib/utils";
import { UpsertResponse } from "@/types/global";
import { UserStatus } from "@prisma/client";
import { ProfessionalServiceImpl } from "../service";
import { ProfessionalValidations } from "../validations";
import { ProfessionalModel } from "../models/professional.model";
import { ProfessionalDetailMapper } from "../mappers/professional-detail.mapper";

export class CreateProfessionalUseCase {
  private readonly service: ProfessionalServiceImpl;

  constructor(service: ProfessionalServiceImpl) {
    this.service = service;
  }

  create = async (body: unknown): Promise<UpsertResponse<ProfessionalModel>> => {
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
    const professional = ProfessionalDetailMapper.fromBdToDomain(createdProfessional);

    return {
      message: `Profesional ${capitalize(professional.names)} ${capitalize(professional.last_names)} creado(a)`,
      data: professional
    };
  };
}
