import type { UpsertResponse } from "@/types/global";
import { UserStatus } from "@prisma/client";
import { PatientMapper } from "../mappers/patient.mapper";
import type { PatientModel } from "../models/patient.model";
import type { PatientServiceRepository } from "../repository";
import { PatientValidations } from "../validations";

export class CreatePatientUseCase {
  private readonly service: PatientServiceRepository;

  constructor(service: PatientServiceRepository) {
    this.service = service;
  }

  create = async (body: unknown): Promise<UpsertResponse<PatientModel>> => {
    const payload = PatientValidations.validateInsertPayload(body);

    const existingPatient = await this.service.findPatientRutAndEmail({
      rut: payload.rut,
      email: payload.email
    });

    if (existingPatient?.rut === payload.rut) {
      PatientValidations.ensureRutNotInUse(payload.rut);
    }
    if (existingPatient?.email === payload.email) {
      PatientValidations.ensureEmailNotInUse(payload.email);
    }

    const createdPatient = await this.service.createPatient({
      ...payload,
      status: UserStatus.ACTIVE
    });
    const patient = PatientMapper.map(createdPatient);

    return {
      data: patient
    };
  };
}
