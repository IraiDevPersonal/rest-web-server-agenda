import { ResponseWithPagination, UpsertResponse } from "@/types/global";
import { PatientMapper } from "../mappers/patient-mapper";
import { PatientModel } from "../models/patient";
import { PatientFilters } from "../models/patient-filters";
import { PatientService } from "../service";
import { PatientValidations } from "../validations/patient-validations";

export class PatientUseCases {
  constructor(private readonly service: PatientService) {}

  getPatients = async (
    filters: PatientFilters
  ): Promise<ResponseWithPagination<PatientModel>> => {
    const { data: bdPatients, ...pagination } = await this.service.getPatients(filters);
    const patients = PatientMapper.response(bdPatients);

    return {
      ...pagination,
      data: patients
    };
  };

  getPatientDetail = async (
    uid: string,
    expandQuery: any
  ): Promise<{
    appointment_history?: any[];
    data: PatientModel;
  }> => {
    let bdPatient = await this.service.getPatientDetail(uid, {
      omit: { id: PatientValidations.withId(expandQuery) }
    });

    bdPatient = PatientValidations.patientExists(bdPatient, uid);
    const patient = PatientMapper.validate(bdPatient);
    const appointment_history = PatientValidations.withHistory(expandQuery);

    return {
      appointment_history,
      data: patient
    };
  };

  createPatient = async (body: any): Promise<UpsertResponse<PatientModel>> => {
    const payload = PatientValidations.insertValidation(body);
    const findedRut = await this.service.findPatientByRutOrEmail({
      rut: payload.rut
    });

    PatientValidations.rutInUse(findedRut?.rut);

    const findedEmail = await this.service.findPatientByRutOrEmail({
      email: payload.email
    });

    PatientValidations.emailInUse(findedEmail?.email);

    const createdPatient = await this.service.createPatient({
      ...payload,
      is_deleted: false
    });
    const patient = PatientMapper.validate(createdPatient);
    const message = `Paciente ${patient.names} ${patient.last_names} creado(a)`;

    return {
      message: message,
      data: patient
    };
  };

  updatePatient = async (
    body: any,
    uid: string
  ): Promise<UpsertResponse<PatientModel>> => {
    const payload = PatientValidations.updateValidation(body);

    let findedPatient = await this.service.getPatientDetail(uid);

    findedPatient = PatientValidations.patientExists(findedPatient, uid);

    const findedRut = await this.service.findPatientByRutOrEmail({
      rut: payload.rut,
      id: findedPatient.id
    });

    PatientValidations.rutInUse(findedRut?.rut);

    const findedEmail = await this.service.findPatientByRutOrEmail({
      email: payload.email,
      id: findedPatient.id
    });

    PatientValidations.emailInUse(findedEmail?.email);

    const updatedPatient = await this.service.updatePatient(payload, findedPatient.uid);
    const patient = PatientMapper.validate(updatedPatient);
    const message = `Paciente ${patient.names} ${patient.last_names} actualizado(a)`;

    return {
      message: message,
      data: patient
    };
  };

  togglePatientStatus = async (uid: string): Promise<UpsertResponse<PatientModel>> => {
    let findedPatient = await this.service.getPatientDetail(uid);

    findedPatient = PatientValidations.patientExists(findedPatient, uid);

    const updatedPatient = await this.service.updatePatient(
      { is_deleted: !findedPatient.is_deleted },
      findedPatient.uid
    );

    const patient = PatientMapper.validate(updatedPatient);
    const message = `Paciente ${patient.names} ${patient.last_names} a sido ${
      updatedPatient.is_deleted ? "deshabilitado(a)" : "habilitado(a)"
    }`;

    return {
      data: patient,
      message
    };
  };
}
