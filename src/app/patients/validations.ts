import { RutManager } from "@/lib/rut-manager";
import { ExistenceValidation } from "@/lib/validations/existence.validation";
import { UpsertPatientApiSchema } from "./schemas/api/upsert-patient.schema";

export class PatientValidations extends ExistenceValidation {
  static validateInsertPayload(body: any) {
    return UpsertPatientApiSchema.omit({ status: true }).parse({
      ...body,
      rut: RutManager.format(body.rut, { dots: true })
    });
  }

  static validateUpdatePayload(body: any) {
    return UpsertPatientApiSchema.omit({ status: true })
      .partial()
      .parse({
        ...body,
        rut: body.rut ? RutManager.format(body.rut, { dots: true }) : undefined
      });
  }

  static validateUpdateStatusPayload(body: any) {
    return UpsertPatientApiSchema.pick({ status: true }).partial().parse(body);
  }
}
