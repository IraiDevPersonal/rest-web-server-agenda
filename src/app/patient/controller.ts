import { Request, Response } from "express";

import { PatientMapper } from "./mappers/patient-mapper";
import { PatientService } from "./service";

import { CustomError } from "@/lib/custom-error";
import { ResponseWithPagination, UpsertResponse } from "@/types/global";
import { PatientFiltersMapper } from "./mappers/patient-filters-mapper";
import { PatientModel } from "./models/patient";
import { PatientValidations } from "./validations/patient-validations";

export class PatientController {
  public constructor(private readonly service: PatientService) {}

  public getAll = async (
    req: Request,
    res: Response<ResponseWithPagination<PatientModel>>
  ) => {
    try {
      const filters = PatientFiltersMapper.getFilters(req);
      const { data: bdPatients, ...pagination } = await this.service.getPatients(filters);
      const patients = PatientMapper.response(bdPatients);

      return res.status(200).json({
        ...pagination,
        data: patients
      });
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  public getByUid = async (
    req: Request,
    res: Response<{
      appointment_history?: any[];
      data: PatientModel;
    }>
  ) => {
    try {
      const uid = req.params.uid;
      let bdPatient = await this.service.findByUid(uid, {
        omit: { id: PatientValidations.withId(req) }
      });

      bdPatient = PatientValidations.patientExists(bdPatient, uid);
      const patient = PatientMapper.validate(bdPatient);
      const appointment_history = PatientValidations.withHistory(req);

      return res.status(200).json({
        appointment_history,
        data: patient
      });
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  public create = async (req: Request, res: Response<UpsertResponse<PatientModel>>) => {
    try {
      const payload = PatientValidations.insertValidation(req);
      const findedRut = await this.service.findByRutOrEmail({
        rut: payload.rut
      });

      PatientValidations.rutInUse(findedRut?.rut);

      const findedEmail = await this.service.findByRutOrEmail({
        email: payload.email
      });

      PatientValidations.emailInUse(findedEmail?.email);

      const createdPatient = await this.service.create({
        ...payload,
        is_deleted: false
      });
      const patient = PatientMapper.validate(createdPatient);
      const message = `Paciente ${patient.names} ${patient.last_names} creado(a)`;

      return res.status(201).json({
        message: message,
        data: patient
      });
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  public update = async (req: Request, res: Response<UpsertResponse<PatientModel>>) => {
    try {
      const uid = req.params.uid!;
      const payload = PatientValidations.updateValidation(req);

      let findedPatient = await this.service.findByUid(uid);

      findedPatient = PatientValidations.patientExists(findedPatient, uid);

      const findedRut = await this.service.findByRutOrEmail({
        rut: payload.rut,
        id: findedPatient.id
      });

      PatientValidations.rutInUse(findedRut?.rut);

      const findedEmail = await this.service.findByRutOrEmail({
        email: payload.email,
        id: findedPatient.id
      });

      PatientValidations.emailInUse(findedEmail?.email);

      const updatedPatient = await this.service.update(payload, findedPatient.uid);
      const patient = PatientMapper.validate(updatedPatient);
      const message = `Paciente ${patient.names} ${patient.last_names} actualizado(a)`;

      return res.status(200).json({
        message: message,
        data: patient
      });
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  public toggleStatus = async (
    req: Request,
    res: Response<UpsertResponse<PatientModel>>
  ) => {
    try {
      const uid = req.params.uid;
      let findedPatient = await this.service.findByUid(uid);

      findedPatient = PatientValidations.patientExists(findedPatient, uid);

      const updatedPatient = await this.service.update(
        { is_deleted: !findedPatient.is_deleted },
        findedPatient.uid
      );

      const patient = PatientMapper.validate(updatedPatient);
      const message = `Paciente ${patient.names} ${patient.last_names} a sido ${
        updatedPatient.is_deleted ? "deshabilitado(a)" : "habilitado(a)"
      }`;

      return res.status(200).json({
        data: patient,
        message
      });
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };
}
