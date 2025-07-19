import { NextFunction, Request, Response } from "express";

import { CustomError } from "@/lib/custom-error";
import { RutManager } from "@/lib/rut-manager";
import { PatientSchema } from "../models/patient";

export class PatientMiddleware {
  static insertValidation(req: Request, res: Response, next: NextFunction) {
    try {
      const { rut, names, last_names, email, phone, address } = req.body;

      const patient = PatientSchema.parse({
        rut: RutManager.format(rut, { dots: true }),
        names,
        last_names,
        email,
        phone,
        address
      });

      req.patient = patient;

      next();
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  }

  static updateValidation(req: Request, res: Response, next: NextFunction) {
    try {
      const { rut, names, last_names, email, phone, address } = req.body;

      if (rut) {
        PatientSchema.shape.rut.parse(rut);
      }
      if (names) {
        PatientSchema.shape.names.parse(names);
      }
      if (last_names) {
        PatientSchema.shape.last_names.parse(last_names);
      }
      if (email) {
        PatientSchema.shape.email.parse(email);
      }
      if (phone) {
        PatientSchema.shape.phone.parse(phone);
      }
      if (address) {
        PatientSchema.shape.address.parse(address);
      }

      next();
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  }
}
