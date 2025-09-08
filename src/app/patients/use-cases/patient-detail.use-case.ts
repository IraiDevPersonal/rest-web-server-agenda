import type { Request } from "express";
import { PatientDetailMapper } from "../mappers/patient-detail.mapper";
import type { PatientModel } from "../models/patient.model";
import type { PatientServiceRepository } from "../repository";
import { PatientValidations } from "../validations";
import type { ExpandPatientTypes } from "../models/shared";

export class PatientDetailUseCase {
  private readonly service: PatientServiceRepository;

  constructor(service: PatientServiceRepository) {
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
    const validPatient = PatientValidations.requireExists(bdPatient);
    const patient = PatientDetailMapper.fromBdToDomain(validPatient);

    // 1. Se valida si el query pide el historial
    if (this.includeHistory(query)) {
      // 2. Si lo pide, se llama al servicio para obtenerlo (lógica de ejemplo)
      // appointment_history = await this.service.getAppointmentHistory(bdPatient.id);
      appointment_history = []; // Placeholder
    }

    return {
      data: patient,
      appointment_history
    };
  };

  private includeHistory = (query: Request["query"]) => {
    return this.getExpandQuery(query)?.includes("appointment_history") ? [] : undefined;
  };

  private includeId = (query: Request["query"]) => {
    return !this.getExpandQuery(query)?.includes("id");
  };

  private getExpandQuery = (query: Request["query"]) => {
    return query.expand as ExpandPatientTypes[] | undefined;
  };
}
