import { RutManager } from "@/lib/rut-manager";
import { ExistenceValidation } from "@/lib/validations/existence.validation";
import { UpserProfessionalSchema } from "./schemas/api/upsert-professional.schema";

export class ProfessionalValidations extends ExistenceValidation {
  static validateInsert(body: any) {
    return UpserProfessionalSchema.omit({ status: true }).parse({
      ...body,
      rut: RutManager.format(body.rut, { dots: true })
    });
  }

  static validateUpdate(body: any) {
    return UpserProfessionalSchema.omit({ status: true })
      .partial()
      .parse({
        ...body,
        rut: RutManager.format(body.rut, { dots: true })
      });
  }

  static validateUpdateStatus(body: any) {
    return UpserProfessionalSchema.pick({ status: true }).partial().parse(body);
  }

  static requireExists<T>(value: T) {
    return super.requireExists(value, "Professional no encontrado");
  }
}
