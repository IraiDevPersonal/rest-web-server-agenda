import type { UpsertResponse } from "@/types/global";
import { UserStatus } from "@prisma/client";
import { PatientMapper } from "../mappers/patient.mapper";
import type { PatientModel } from "../models/patient.model";
import type { PatientServiceRepository } from "../repository";
import { PatientValidations } from "../validations";

export class UpdatePatientStatusUseCase {
  private readonly service: PatientServiceRepository;

  constructor(service: PatientServiceRepository) {
    this.service = service;
  }

  updateStatus = async (uid: string, body: unknown): Promise<UpsertResponse<PatientModel>> => {
    const { status } = PatientValidations.validateUpdateStatusPayload(body);
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
      data: patient
    };
  };
}
