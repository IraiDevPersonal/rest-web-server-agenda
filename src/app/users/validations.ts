import { RutManager } from "@/lib/rut-manager";
import { ExistenceValidation } from "@/lib/validations/existence.validation";
import { UpsertUserSchema } from "./schemas/api/upsert-user.schema";

export class UserValidations extends ExistenceValidation {
  static validateInsert(body: any) {
    return UpsertUserSchema.omit({ status: true }).parse({
      ...body,
      rut: RutManager.format(body.rut, { dots: true })
    });
  }

  static validateUpdate(body: any) {
    return UpsertUserSchema.omit({ status: true })
      .partial()
      .parse({
        ...body,
        rut: RutManager.format(body.rut, { dots: true })
      });
  }

  static validateUpdateStatus(body: any) {
    return UpsertUserSchema.pick({ status: true }).partial().parse(body);
  }

  static requireExists<T>(value: T) {
    return super.requireExists(value, "User no encontrado");
  }
}