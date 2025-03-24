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

      const patient = patientSchema.parse({
        rut: RutManager.format(rut, { dots: true }),
        names,
        last_names,
        email,
        phone,
        address,
      });
      req.patient = patient;

      next();
    } catch (error) {
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

  static updateValidation(req: Request, res: Response, next: NextFunction) {
    try {
      const { rut, names, last_names, email, phone, address } = req.body;

      if (rut) {
        patientSchema.shape.rut.parse(rut);
      }
      if (names) {
        patientSchema.shape.names.parse(names);
      }
      if (last_names) {
        patientSchema.shape.last_names.parse(last_names);
      }
      if (email) {
        patientSchema.shape.email.parse(email);
      }
      if (phone) {
        patientSchema.shape.phone.parse(phone);
      }
      if (address) {
        patientSchema.shape.address.parse(address);
      }

      next();
    } catch (error) {
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
