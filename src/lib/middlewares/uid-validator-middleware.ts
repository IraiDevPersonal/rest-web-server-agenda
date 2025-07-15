import { Response, Request, NextFunction } from "express";

import { CustomError } from "../custom-error";
import { Uid } from "../uid";

export class UidValidatorMiddleware {
  static validate(req: Request, res: Response, next: NextFunction) {
    try {
      const uid = req.params.uid;

      if (!uid) {
        throw CustomError.badRequest("Necesitas enviar el identificador");
      }

      if (!Uid.isValid(uid)) {
        throw CustomError.badRequest(
          "Necesitas enviar un identificador valido"
        );
      }

      next();
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  }
}
