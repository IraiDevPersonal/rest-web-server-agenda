import { CustomError } from "@/lib/custom-error";

export class ProfessionalValidations {
  static exists<T>(professional: T, uid: string): NonNullable<T> {
    if (!professional) {
      throw CustomError.notFound(`Profesional con UID: ${uid} no existe`);
    }
    return professional;
  }
}
