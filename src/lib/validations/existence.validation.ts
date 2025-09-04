import { CustomError } from "../custom-error";

export class ExistenceValidation {
  static requireExists<T>(value: T, errorMessage?: string): NonNullable<T> {
    if (!value) {
      throw CustomError.notFound(errorMessage ?? "not found");
    }
    return value;
  }

  static ensureRutNotInUse(rut: string | undefined) {
    if (rut) {
      throw CustomError.badRequest(`rut: ${rut} already in use`);
    }
  }

  static ensureEmailNotInUse(email: string | undefined) {
    if (email) {
      throw CustomError.badRequest(`emial: ${email} already in use`);
    }
  }
}
