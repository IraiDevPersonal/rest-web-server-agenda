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

    const existingPatientWithData = await this.service.findPatientByRutOrEmail({
      rut: payload.rut,
      email: payload.email,
      uid: uid // Excluir al paciente actual de la búsqueda
      // TODO: revisar bien esto, para saber si el usuario existe o no antes de actualizar
    });

    if (existingPatientWithData?.rut === payload.rut) {
      PatientValidation.rutInUse(payload.rut);
    }
    if (existingPatientWithData?.email === payload.email) {
      PatientValidation.emailInUse(payload.email);
    }

    const updatedPatient = await this.service.updatePatient(uid, payload);
    const patient = PatientMapper.map(updatedPatient);

    return {
      message: `Paciente actualizado(a)`,
      data: patient
    };
  };
}
