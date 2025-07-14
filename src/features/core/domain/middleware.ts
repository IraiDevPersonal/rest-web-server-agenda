import { Response, Request, NextFunction } from 'express';
import { validate } from 'uuid';
import { CustomError } from './custom.error';

export class Middlewares {
  static uidValidator(req: Request, res: Response, next: NextFunction) {
    try {
      const uid = req.params.uid;

      if (!uid) {
        throw CustomError.badRequest('Necesitas enviar el identificador');
      }

      if (!validate(uid)) {
        throw CustomError.badRequest(
          'Necesitas enviar un identificador valido'
        );
      }

      next();
    } catch (error) {
      console.log('catch ', error);
      const e = CustomError.internalServer(`${error}`);
      return CustomError.handleError(e, res);
    }
  }
}
