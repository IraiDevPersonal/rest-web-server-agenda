import { RutManager } from "@/lib/rut-manager";
import { ExistenceValidation } from "@/lib/validations/existence.validation";
import { UpsertPatientApiSchema } from "./schemas/api/upsert-patient.schema";

export class PatientValidations extends ExistenceValidation {
  private static formatBirthDate(birth_date: any) {
    return birth_date ? new Date(birth_date) : undefined
    }

  private static formatRut(rut: any) {
    return rut ? RutManager.format(rut, { dots: true }) : undefined
  }

  static validateInsertPayload(body: any) {
    return UpsertPatientApiSchema.omit({ status: true }).parse({
      ...body,
      birth_date: PatientValidations.formatBirthDate(body.birth_date),
      rut: PatientValidations.formatRut(body.rut)
    });
  }

  static validateUpdatePayload(body: any) {
    return UpsertPatientApiSchema.omit({ status: true })
      .partial()
      .parse({
        ...body,
        birth_date: PatientValidations.formatBirthDate(body.birth_date),
        rut: PatientValidations.formatRut(body.rut)
      });
  }

  static validateUpdateStatusPayload(body: any) {
    return UpsertPatientApiSchema.pick({ status: true }).partial().parse(body);
  }
}
