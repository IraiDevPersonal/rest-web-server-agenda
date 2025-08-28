import { CustomError } from "@/lib/custom-error";
import { RutManager } from "@/lib/rut-manager";
import { UpsertPatientApiSchema } from "../schemas/api/upsert-patient.schema";

export class PatientValidation {
  static validateInsert(body: any) {
    return UpsertPatientApiSchema.omit({ status: true }).parse({
      ...body,
      rut: RutManager.format(body.rut, { dots: true })
    });
  }

  static validateUpdate(body: any) {
    return UpsertPatientApiSchema.omit({ status: true })
      .partial()
      .parse({
        ...body,
        rut: body.rut ? RutManager.format(body.rut, { dots: true }) : undefined
      });
  }

  static validateUpdateStatus(body: any) {
    return UpsertPatientApiSchema.pick({ status: true }).partial().parse(body);
  }

  static found<T>(value: T, uid: string): NonNullable<T> {
    if (!value) {
      throw CustomError.badRequest(`No se ha encontrado al paciente UID: ${uid}`);
    }
    return value;
  }

  static exist(value: unknown): boolean {
    return Boolean(value);
  }

  static rutInUse(rut: string | undefined) {
    if (rut) {
      throw CustomError.badRequest(`Rut ${rut} ya esta resgistrado`);
    }
  }

  static emailInUse(email: string | undefined) {
    if (email) {
      throw CustomError.badRequest(`Correo ${email} ya esta resgistrado`);
    }
  }
}
