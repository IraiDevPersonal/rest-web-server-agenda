import { UpsertResponse } from "@/types/global";
import { UserStatus } from "@prisma/client";
import { PatientMapper } from "../mappers/patient.mapper";
import { PatientModel } from "../models/patient.model";
import { PatientServiceImpl } from "../service";
import { PatientValidation } from "../validations/patient.validation";
import { capitalize } from "@/lib/utils";

export class CreatePatientUseCase {
  private readonly service: PatientServiceImpl;

  constructor(service: PatientServiceImpl) {
    this.service = service;
  }

  create = async (body: unknown): Promise<UpsertResponse<PatientModel>> => {
    const payload = PatientValidation.validateInsert(body);

    const existingPatient = await this.service.findPatientByRutOrEmail({
      rut: payload.rut,
      email: payload.email
    });

    if (existingPatient?.rut === payload.rut) {
      PatientValidation.rutInUse(payload.rut);
    }
    if (existingPatient?.email === payload.email) {
      PatientValidation.emailInUse(payload.email);
    }

    const createdPatient = await this.service.createPatient({
      ...payload,
      status: UserStatus.ACTIVE
    });
    const patient = PatientMapper.map(createdPatient);

    return {
      message: `Paciente ${capitalize(patient.names)} ${capitalize(patient.last_names)} creado(a)`,
      data: patient
    };
  };
}
