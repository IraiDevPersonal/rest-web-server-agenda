import { CustomError } from "@core/domain/custom.error";
import { Middlewares } from "@core/domain/middleware";
import { RutManager } from "@core/domain/rut";
import { NextFunction, Request, Response } from "express";
import { patientSchema } from "../schemas/patient_schema";
import { ZodError } from "zod";

export class PatientMiddleware implements Middlewares {
  static insertValidation(req: Request, res: Response, next: NextFunction) {
    try {
      const { rut, names, last_names, email, phone, address } = req.body;

      if (!rut || !RutManager.validate(rut)) {
        throw CustomError.badRequest("Debe enviar un rut valido");
      }
      patientSchema.parse({
        rut,
        names,
        last_names,
        email,
        phone,
        address,
      });

      next();
      //   req.patient = patient;
      //   next();
    } catch (error) {
      console.log("catch ", error);
      if (error instanceof ZodError) {
        const e = CustomError.internalServer(
          error.issues.map((e) => `${e.path} ${e.message}`).join(",")
        );
        return CustomError.handleError(e, res);
      }
      const e = CustomError.internalServer(`${error}`);
      return CustomError.handleError(e, res);
    }
  }
}
