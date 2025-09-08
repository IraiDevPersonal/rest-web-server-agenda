import type { Response, Request, NextFunction } from "express";

import { CustomError } from "../custom-error";
import { Uid } from "../uid";

export class UidValidatorMiddleware {
  static validate(req: Request, res: Response, next: NextFunction) {
    try {
      const uid = req.params.uid;

      if (!uid) {
        throw CustomError.badRequest("UID parameter is required");
      }

      if (!Uid.isValid(uid)) {
        throw CustomError.badRequest("Invalid UID format");
      }

      next();
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  }
}
