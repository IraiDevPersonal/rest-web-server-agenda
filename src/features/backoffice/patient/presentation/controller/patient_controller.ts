import { Request, Response } from "express";
import { Controllers } from "@core/domain/controllers";
import { PatientService } from "@patients/presentation/service/patient_service";
import { CustomError } from "@core/domain/custom.error";
import { PatientMapper } from "@patients/domain/entities/patient_Mapper";

export class PatientController implements Controllers {
  public constructor(private readonly service: PatientService) {}

  public getAll = async (req: Request, res: Response) => {
    try {
      const filters = this.getFilters(req);
      const patients = await this.service.getAllPatients(filters);

      return res.status(200).json(patients);
    } catch (error) {
      console.log("catch ", error);
      const e = CustomError.internalServer(`${error}`);
      return CustomError.handleError(e, res);
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

      return res.status(201).json(PatientMapper.fromJson(createdPatient));
    } catch (error) {
      console.log("catch ", error);
      const e = CustomError.internalServer(`${error}`);
      return CustomError.handleError(e, res);
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
      console.log("catch ", error);
      const e = CustomError.internalServer(`${error}`);
      return CustomError.handleError(e, res);
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
      console.log("catch ", error);
      const e = CustomError.internalServer(`${error}`);
      return CustomError.handleError(e, res);
    }
  };

  public getFilters(req: Request): Record<string, any> {
    const { rut, names, last_names, email } = req.query;

    return {
      rut,
      names,
      last_names,
      email
    };
  }
}
