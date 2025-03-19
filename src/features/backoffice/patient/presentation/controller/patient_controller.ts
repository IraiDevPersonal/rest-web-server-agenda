import { Request, Response } from "express";
import { Controllers } from "@core/domain/controllers";
import { PatientService } from "@patients/presentation/service/patient_service";
import { CustomError } from "@core/domain/custom.error";

export class PatientController implements Controllers {
  public constructor(private readonly service: PatientService) {}

  public create = async (req: Request, res: Response) => {
    try {
      const { rut, names, last_names, email, phone, address } = req.body;
      const patient = await this.service.create({
        rut,
        names,
        last_names,
        email,
        phone,
        address,
      });

      return res.status(201).json(patient);
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
