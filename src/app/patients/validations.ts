import { RutManager } from "@/lib/rut-manager";
import { ExistenceValidation } from "@/lib/validations/existence.validation";
import { UpsertPatientApiSchema } from "./schemas/api/upsert-patient.schema";

export class PatientValidations extends ExistenceValidation {
  private static formatBirthDate(body: any) {
    return body.birth_date ? new Date(body.birth_date) : undefined
  }

  private static formatRut(body: any) {
    return body.rut ? RutManager.format(body.rut, { dots: true }) : undefined
  }

  static validateInsertPayload(body: any) {
    return UpsertPatientApiSchema.omit({ status: true }).parse({
      ...body,
      birth_date: PatientValidations.formatBirthDate(body),
      rut: PatientValidations.formatRut(body)
    });
  }

  static validateUpdatePayload(body: any) {
    return UpsertPatientApiSchema.omit({ status: true })
      .partial()
      .parse({
        ...body,
        birth_date: PatientValidations.formatBirthDate(body),
        rut: PatientValidations.formatRut(body)
      });
  }

  static validateUpdateStatusPayload(body: any) {
    return UpsertPatientApiSchema.pick({ status: true }).partial().parse(body);
  }
}
