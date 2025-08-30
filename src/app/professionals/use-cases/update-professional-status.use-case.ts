import { UpsertResponse } from "@/types/global";
import { ProfessionalServiceImpl } from "../service";
import { ProfessionalValidations } from "../validations";
import { UserStatus } from "@prisma/client";
import { capitalize } from "@/lib/utils";
import { ProfessionalModel } from "../models/professional.model";
import { ProfessionalDetailMapper } from "../mappers/professional-detail.mapper";

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

  updateStatus = async (uid: string, body: unknown): Promise<UpsertResponse<ProfessionalModel>> => {
    const { status } = ProfessionalValidations.validateUpdateStatus(body);
    const bgProfessional = await this.service.getProfessionalByUid(uid);
    const validProfessional = ProfessionalDetailMapper.fromBdToDomain(
      ProfessionalValidations.requireExists(bgProfessional)
    );

    const updatedProfessional = await this.service.updateProfessional(uid, {
      status: status
        ? status
        : validProfessional.status === UserStatus.ACTIVE
          ? UserStatus.INACTIVE
          : UserStatus.ACTIVE
    });
    const professional = ProfessionalDetailMapper.map(updatedProfessional);

    return {
      data: professional,
      message: `Profesional ${capitalize(professional.names)} ${capitalize(professional.last_names)} ha sido ${this.HASH_STATUS[professional.status]}`
    };
  };
}
