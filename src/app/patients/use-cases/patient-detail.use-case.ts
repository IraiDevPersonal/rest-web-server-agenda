import { Request } from "express";
import { PatientDetailMapper } from "../mappers/patient-detail.mapper";
import { PatientModel } from "../models/patient.model";
import { PatientServiceImpl } from "../service";
import { PatientValidation } from "../validations/patient.validation";

export class PatientDetailUseCase {
  private readonly service: PatientServiceImpl;

  constructor(service: PatientServiceImpl) {
    this.service = service;
  }

  getDetail = async (
    uid: string,
    query: Request["query"]
  ): Promise<{
    appointment_history?: unknown[];
    data: PatientModel;
  }> => {
    let appointment_history: any[] | undefined = undefined;
    const bdPatient = await this.service.getPatientByUid(uid);
    const validPatient = PatientValidation.exists(bdPatient, uid);
    const patient = PatientDetailMapper.fromBdToDomain(validPatient);

    // 1. Se valida si el query pide el historial
    if (PatientValidation.withHistory(query)) {
      // 2. Si lo pide, se llama al servicio para obtenerlo (lógica de ejemplo)
      // appointment_history = await this.service.getAppointmentHistory(bdPatient.id);
      appointment_history = []; // Placeholder
    }

    return {
      data: patient,
      appointment_history
    };
  };
}
