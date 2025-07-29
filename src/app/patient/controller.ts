import { Request, Response } from "express";

import { type PatientFilters } from "./models/patient-filters";
import { PatientMapper } from "./mappers/patient-mapper";
import { PatientService } from "./service";

import { CustomError } from "@/lib/custom-error";
import { Controllers } from "@/lib/controllers";
import { ResponseWithPagination, UpsertResponse } from "@/types/global";
import { PatientModel } from "./models/patient";
import { ExpandPatientTypes } from "./models";

export class PatientController implements Controllers<PatientFilters> {
  public constructor(private readonly service: PatientService) {}

  public getAll = async (
    req: Request,
    res: Response<ResponseWithPagination<PatientModel>>
  ) => {
    try {
      const filters = this.getFilters(req);
      const { data: bdPatients, ...pagination } =
        await this.service.getPatients(filters);
      const patients = PatientMapper.response(bdPatients);

      return res.status(200).json({
        total: pagination.total,
        page: pagination.page,
        pages: pagination.pages,
        limit: pagination.limit,
        data: patients
      });
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  public getByUid = async (
    req: Request,
    res: Response<{
      data: PatientModel;
      appointment_history?: any[];
    }>
  ) => {
    try {
      const uid = req.params.uid;
      const expand = req.query.expand as ExpandPatientTypes[] | undefined;

      const bdPatient = await this.service.findByUid(uid, {
        omit: {
          id: !expand?.includes("id")
        }
      });

      if (!bdPatient) {
        throw CustomError.badRequest(
          `Paciente con Uid: (${uid}) no encontrado`
        );
      }

      const patient = PatientMapper.validate(bdPatient);
      const appointment_history = expand?.includes("appointment_history")
        ? []
        : undefined;

      return res.status(200).json({
        appointment_history,
        data: patient
      });
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  public create = async (
    req: Request,
    res: Response<UpsertResponse<PatientModel>>
  ) => {
    try {
      const patient = req.patient!;

      const rutOrEmail = await this.service.findByRutOrEmail(
        patient.rut,
        patient.email
      );

      if (rutOrEmail) {
        throw CustomError.badRequest(
          `Paciente con rut (${patient.rut}) o email (${patient.email}) ya existe`
        );
      }

      const createdPatient = await this.service.create({
        rut: patient.rut,
        names: patient.names,
        last_names: patient.last_names,
        email: patient.email,
        phone: patient.phone,
        address: patient.address,
        is_deleted: false
      });

      return res.status(201).json({
        message: "Paciente creado correctamente",
        data: PatientMapper.validate(createdPatient)
      });
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  public update = async (
    req: Request,
    res: Response<UpsertResponse<PatientModel>>
  ) => {
    try {
      const uid = req.params.uid!;
      const { rut, names, last_names, email, phone, address } = req.body;

      const findedPatient = await this.service.findByUid(uid);

      if (!findedPatient) {
        throw CustomError.badRequest(
          `Paciente con identificacion (${uid}) no encontrado`
        );
      }

      const rutAndEmail = await this.service.findByRutOrEmail(
        rut,
        email,
        findedPatient.id
      );

      if (rutAndEmail) {
        throw CustomError.badRequest(
          `Paciente con rut (${rut ?? ""}) o email (${email ?? ""}) ya existe`
        );
      }

      const payload = {
        rut,
        names,
        last_names,
        email,
        phone,
        address
      };

      const updatedPatient = await this.service.update(
        payload,
        findedPatient.uid
      );

      return res.status(200).json({
        message: "Paciente actualizado correctamente",
        data: PatientMapper.validate(updatedPatient)
      });
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  public toggleStatus = async (
    req: Request,
    res: Response<UpsertResponse<PatientModel>>
  ) => {
    const uid = req.params.uid!;

    try {
      const findedPatient = await this.service.findByUid(uid);
      if (!findedPatient) {
        throw CustomError.badRequest(
          `No se ha encontrado el paciente con UID: (${uid})`
        );
      }

      const updatedPatient = await this.service.update(
        { is_deleted: !findedPatient.is_deleted },
        findedPatient.uid
      );

      return res.status(200).json({
        message: `Se ha cambiado el estado del paciente a ${
          updatedPatient.is_deleted ? "inactivo" : "activo"
        }`,
        data: PatientMapper.validate(updatedPatient)
      });
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  public getFilters(req: Request) {
    const { rut, name, email, status, page = "1", limit = "10" } = req.query;

    return {
      rut: rut as string | undefined,
      name: name as string | undefined,
      email: email as string | undefined,
      is_deleted: status
        ? status === "inactive"
        : (undefined as boolean | undefined),
      page: !isNaN(Number(page)) && Number(page) > 0 ? Number(page) : 1,
      limit: !isNaN(Number(limit)) && Number(limit) > 0 ? Number(limit) : 10
    };
  }
}
