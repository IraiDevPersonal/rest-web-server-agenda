import { Request, Response } from "express";

import { type PatientFilters } from "./models/patient-filters";
import { PatientMapper } from "./mappers/patient-mapper";
import { PatientService } from "./service";

import { CustomError } from "@/lib/custom-error";
import { Controllers } from "@/lib/controllers";

export class PatientController implements Controllers<PatientFilters> {
  public constructor(private readonly service: PatientService) {}

  public getPatients = async (req: Request, res: Response) => {
    try {
      const filters = this.getFilters(req);
      const bdPatients = await this.service.getPatients(filters);
      const patients = PatientMapper.response(bdPatients);

      return res.status(200).json(patients);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  public create = async (req: Request, res: Response) => {
    try {
      const patient = req.patient!;

      const rutAndEmail = await this.service.findByRutOrEmail(
        patient.rut,
        patient.email
      );

      if (rutAndEmail) {
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

      return res.status(201).json(PatientMapper.validate(createdPatient));
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  public update = async (req: Request, res: Response) => {
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

      await this.service.update(payload, findedPatient.id);

      return res.status(200).json();
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  public delete = async (req: Request, res: Response) => {
    const uid = req.params.uid!;

    try {
      const findedPatient = await this.service.findByUid(uid);
      if (!findedPatient) {
        throw CustomError.badRequest(
          `Paciente con identificacion (${uid}) no encontrado`
        );
      }

      await this.service.update({ is_deleted: true }, findedPatient.id);

      return res.status(204).json();
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  public getFilters(req: Request) {
    const { rut, names, last_names, email } = req.query;

    return {
      rut: rut as string | undefined,
      names: names as string | undefined,
      last_names: last_names as string | undefined,
      email: email as string | undefined
    };
  }
}
