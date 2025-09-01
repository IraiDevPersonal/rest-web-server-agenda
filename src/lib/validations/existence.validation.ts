import { CustomError } from "../custom-error";

export class ExistenceValidation {
  static requireExists<T>(value: T, errorMessage: string): NonNullable<T> {
    if (!value) {
      throw CustomError.notFound(errorMessage);
    }
    return value;
  }

  static ensureRutNotInUse(rut: string | undefined) {
    if (rut) {
      throw CustomError.badRequest(`Rut ${rut} ya esta registrado`);
    }
  }

  static ensureEmailNotInUse(email: string | undefined) {
    if (email) {
      throw CustomError.badRequest(`Correo ${email} ya esta registrado`);
    }
  }
}
