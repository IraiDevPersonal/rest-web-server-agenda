import { UpsertResponse } from "@/types/global";
import { PatientMapper } from "../mappers/patient.mapper";
import { PatientModel } from "../models/patient.model";
import { PatientServiceImpl } from "../service";
import { PatientValidation } from "../validations/patient.validation";
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
    const found = await this.service.getPatientByUid(uid);
    const validPatient = PatientValidation.found(found, uid);
    const { status } = PatientValidation.validateUpdateStatus(body);

    const updatedPatient = await this.service.updatePatient(validPatient.uid, {
      status: status ? status : validPatient.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"
    });
    const patient = PatientMapper.map(updatedPatient);

    return {
      data: patient,
      message: `Paciente ${capitalize(patient.names)} ${capitalize(patient.last_names)} ha sido ${this.HASH_STATUS[patient.status]}`
    };
  };
}
