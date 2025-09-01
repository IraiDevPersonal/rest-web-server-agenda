import { RutManager } from "@/lib/rut-manager";
import { ExistenceValidation } from "@/lib/validations/existence.validation";
import { UpsertPatientApiSchema } from "./schemas/api/upsert-patient.schema";

export class PatientValidations extends ExistenceValidation {
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

  static requireExists<T>(value: T): NonNullable<T> {
    return super.requireExists(value, "Paciente no encontrado");
  }
}
