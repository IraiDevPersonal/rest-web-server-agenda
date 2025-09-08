import type { UpsertResponse } from "@/types/global";
import { PatientMapper } from "../mappers/patient.mapper";
import type { PatientModel } from "../models/patient.model";
import type { PatientServiceRepository } from "../repository";
import { PatientValidations } from "../validations";

export class UpdatePatientUseCase {
  private readonly service: PatientServiceRepository;

  constructor(service: PatientServiceRepository) {
    this.service = service;
  }

  update = async (uid: string, body: unknown): Promise<UpsertResponse<PatientModel>> => {
    const payload = PatientValidations.validateUpdatePayload(body);

    const existingPatient = await this.service.findPatientRutAndEmail({
      rut: payload.rut,
      email: payload.email,
      uid: uid
    });

    if (existingPatient?.rut === payload.rut) {
      PatientValidations.ensureRutNotInUse(payload.rut);
    }
    if (existingPatient?.email === payload.email) {
      PatientValidations.ensureEmailNotInUse(payload.email);
    }

    const updatedPatient = await this.service.updatePatient(uid, payload);
    const patient = PatientMapper.map(updatedPatient);

    return {
      data: patient
    };
  };
}
