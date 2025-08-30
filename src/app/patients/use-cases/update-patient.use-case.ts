import { UpsertResponse } from "@/types/global";
import { PatientMapper } from "../mappers/patient.mapper";
import { PatientModel } from "../models/patient.model";
import { PatientServiceImpl } from "../service";
import { PatientValidations } from "../validations";

export class UpdatePatientUseCase {
  private readonly service: PatientServiceImpl;

  constructor(service: PatientServiceImpl) {
    this.service = service;
  }

  update = async (uid: string, body: unknown): Promise<UpsertResponse<PatientModel>> => {
    const payload = PatientValidations.validateUpdate(body);

    const existingPatient = await this.service.findPatientRutAndEmail({
      rut: payload.rut,
      email: payload.email,
      uid: uid // Excluir al paciente actual de la búsqueda
      // TODO: revisar bien esto, para saber si el usuario existe o no antes de actualizar
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
      message: `Paciente actualizado(a)`,
      data: patient
    };
  };
}
