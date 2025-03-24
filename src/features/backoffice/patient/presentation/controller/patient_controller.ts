import { Request, Response } from "express";
import { Controllers } from "@core/domain/controllers";
import { PatientService } from "@patients/presentation/service/patient_service";
import { CustomError } from "@core/domain/custom.error";
import { PatientEntity } from "@patients/domain/entities/patient_entity";

export class PatientController implements Controllers {
  public constructor(private readonly service: PatientService) {}

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
      });

      return res.status(201).json(PatientEntity.fromJson(createdPatient));
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

      const payload = {
        rut,
        names,
        last_names,
        email,
        phone,
        address,
      };

      await this.service.update(payload, findedPatient.id);
    } catch (error) {
      console.log("catch ", error);
      const e = CustomError.internalServer(`${error}`);
      return CustomError.handleError(e, res);
    }
  };

  getFilters(request: Request): Record<string, any> {
    throw new Error("Method not implemented.");
  }
}
