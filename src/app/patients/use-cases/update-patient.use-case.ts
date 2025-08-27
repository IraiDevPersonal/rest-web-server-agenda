import { UpsertResponse } from "@/types/global";
import { PatientMapper } from "../mappers/patient.mapper";
import { PatientModel } from "../models/patient.model";
import { PatientServiceImpl } from "../service";
import { PatientValidation } from "../validations/patient.validation";

export class UpdatePatientUseCase {
  private readonly service: PatientServiceImpl;

  constructor(service: PatientServiceImpl) {
    this.service = service;
  }

  update = async (uid: string, body: unknown): Promise<UpsertResponse<PatientModel>> => {
    const payload = PatientValidation.validateUpdate(body);
    const found = await this.service.getPatientByUid(uid);
    const validPatient = PatientValidation.exists(found, uid);

    const existingPatientWithData = await this.service.findPatientByRutOrEmail({
      rut: payload.rut,
      email: payload.email,
      id: validPatient.id // Excluir al paciente actual de la búsqueda
    });

    if (existingPatientWithData?.rut === payload.rut) PatientValidation.rutInUse(payload.rut);
    if (existingPatientWithData?.email === payload.email) PatientValidation.emailInUse(payload.email);

    const updatedPatient = await this.service.updatePatient(validPatient.uid, payload);
    const patient = PatientMapper.map(updatedPatient);

    return {
      message: `Paciente ${patient.names} ${patient.last_names} actualizado(a)`,
      data: patient
    };
  };
}
