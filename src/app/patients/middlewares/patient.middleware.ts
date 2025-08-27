import { NextFunction, Request, Response } from "express";

import { CustomError } from "@/lib/custom-error";
import { ExpandPatientTypes } from "../models/shared";

export class PatientMiddleware {
  static validateExpandQuery(req: Request, res: Response, next: NextFunction) {
    try {
      const expand = req.query.expand;

      if (expand) {
        const allowedExpands: ExpandPatientTypes[] = ["id", "appointment_history"];
        const expandArray = Array.isArray(expand) ? expand : [expand];

        for (const item of expandArray) {
          if (!allowedExpands.includes(item as any)) {
            throw CustomError.badRequest(`El parametro recibido en "expand" '${item}' no es soportado.`);
          }
        }
      }
      next();
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  }
}
