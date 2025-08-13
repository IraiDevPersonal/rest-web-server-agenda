import { ResponseWithPagination, UpsertResponse } from "@/types/global";
import { Request } from "express";
import { PatientMapper } from "../mappers/patient-mapper";
import { PatientModel } from "../models/patient";
import { PatientService } from "../service";
import { PatientValidations } from "../validations/patient-validations";
import { patients as Patient } from "@prisma/client";

export class PatientUseCases {
  constructor(private readonly service: PatientService) {}

  private _getAndValidatePatient = async (uid: string): Promise<Patient> => {
    const patient = await this.service.getPatientDetail(uid);
    return PatientValidations.exists(patient, uid);
  };

  getPatients = async (
    query: Request["query"]
  ): Promise<ResponseWithPagination<PatientModel>> => {
    const filters = PatientMapper.getFilters(query);
    const { data: bdPatients, ...pagination } = await this.service.getPatients(filters);
    const patients = PatientMapper.response(bdPatients);

    return {
      ...pagination,
      data: patients
    };
  };

  getPatientDetail = async (
    uid: string,
    query: Request["query"]
  ): Promise<{
    appointment_history?: any[];
    data: PatientModel;
  }> => {
    const result = await this._getAndValidatePatient(uid);
    const patient = PatientMapper.validate(result);
    let appointment_history: any[] | undefined = undefined;

    // 1. Se valida si el query pide el historial
    if (PatientValidations.withHistory(query)) {
      // 2. Si lo pide, se llama al servicio para obtenerlo (lógica de ejemplo)
      // appointment_history = await this.service.getAppointmentHistory(bdPatient.id);
      appointment_history = []; // Placeholder
    }

    return {
      data: patient,
      appointment_history
    };
  };

  createPatient = async (body: unknown): Promise<UpsertResponse<PatientModel>> => {
    const payload = PatientValidations.insertValidation(body);

    const existingPatient = await this.service.findPatientByRutOrEmail({
      rut: payload.rut,
      email: payload.email
    });

    if (existingPatient) {
      if (existingPatient.rut === payload.rut) {
        PatientValidations.rutInUse(payload.rut);
      }
      if (existingPatient.email === payload.email) {
        PatientValidations.emailInUse(payload.email);
      }
    }

    const createdPatient = await this.service.createPatient({
      ...payload,
      is_deleted: false
    });
    const patient = PatientMapper.validate(createdPatient);

    return {
      message: `Paciente ${patient.names} ${patient.last_names} creado(a)`,
      data: patient
    };
  };

  updatePatient = async (
    uid: string,
    body: unknown
  ): Promise<UpsertResponse<PatientModel>> => {
    const payload = PatientValidations.updateValidation(body);
    const findedPatient = await this._getAndValidatePatient(uid);

    const existingPatientWithData = await this.service.findPatientByRutOrEmail({
      rut: payload.rut,
      email: payload.email,
      id: findedPatient.id // Excluir al paciente actual de la búsqueda
    });

    if (existingPatientWithData) {
      if (existingPatientWithData.rut === payload.rut)
        PatientValidations.rutInUse(payload.rut);
      if (existingPatientWithData.email === payload.email)
        PatientValidations.emailInUse(payload.email);
    }

    const updatedPatient = await this.service.updatePatient(findedPatient.uid, payload);
    const patient = PatientMapper.validate(updatedPatient);

    return {
      message: `Paciente ${patient.names} ${patient.last_names} actualizado(a)`,
      data: patient
    };
  };

  togglePatientStatus = async (uid: string): Promise<UpsertResponse<PatientModel>> => {
    const findedPatient = await this._getAndValidatePatient(uid);

    const updatedPatient = await this.service.updatePatient(findedPatient.uid, {
      is_deleted: !findedPatient.is_deleted
    });

    const patient = PatientMapper.validate(updatedPatient);

    return {
      data: patient,
      message: `Paciente ${patient.names} ${patient.last_names} ha sido ${
        updatedPatient.is_deleted ? "deshabilitado(a)" : "habilitado(a)"
      }`
    };
  };
}
