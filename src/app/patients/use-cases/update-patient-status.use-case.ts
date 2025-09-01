import { UpsertResponse } from "@/types/global";
import { PatientMapper } from "../mappers/patient.mapper";
import { PatientModel } from "../models/patient.model";
import { PatientServiceImpl } from "../service";
import { PatientValidations } from "../validations";
import { UserStatus } from "@prisma/client";
import { capitalize } from "@/lib/utils";

export class UpdatePatientStatusUseCase {
  private readonly service: PatientServiceImpl;
  private readonly HASH_STATUS: Record<UserStatus, string> = {
    ACTIVE: "habilitado",
    INACTIVE: "deshabilitado",
    BLOCKED: "bloqueado"
  };

  constructor(service: PatientServiceImpl) {
    this.service = service;
  }

  updateStatus = async (uid: string, body: unknown): Promise<UpsertResponse<PatientModel>> => {
    const { status } = PatientValidations.validateUpdateStatus(body);
    const bgPatient = await this.service.getPatientByUid(uid);
    const validPatient = PatientMapper.map(PatientValidations.requireExists(bgPatient));

    const updatedPatient = await this.service.updatePatient(uid, {
      status: status
        ? status
        : validPatient.status === UserStatus.ACTIVE
          ? UserStatus.INACTIVE
          : UserStatus.ACTIVE
    });
    const patient = PatientMapper.map(updatedPatient);

    return {
      data: patient,
      message: `Paciente ${capitalize(patient.names)} ${capitalize(patient.last_names)} ha sido ${this.HASH_STATUS[patient.status]}`
    };
  };
}
