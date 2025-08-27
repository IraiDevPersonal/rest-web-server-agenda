import { UpsertResponse } from "@/types/global";
import { PatientMapper } from "../mappers/patient.mapper";
import { PatientModel } from "../models/patient.model";
import { PatientServiceImpl } from "../service";
import { PatientValidation } from "../validations/patient.validation";

export class TogglePatientStatusUseCase {
  private readonly service: PatientServiceImpl;

  constructor(service: PatientServiceImpl) {
    this.service = service;
  }

  toggleStatus = async (uid: string): Promise<UpsertResponse<PatientModel>> => {
    const found = await this.service.getPatientByUid(uid);
    const validPatient = PatientValidation.exists(found, uid);

    const updatedPatient = await this.service.updatePatient(validPatient.uid, {
      status: validPatient.status === "ACTIVE" ? "BLOCKED" : "ACTIVE"
    });

    const patient = PatientMapper.map(updatedPatient);

    return {
      data: patient,
      message: `Paciente ${patient.names} ${patient.last_names} ha sido ${
        updatedPatient.status ? "deshabilitado(a)" : "habilitado(a)"
      }`
    };
  };
}
