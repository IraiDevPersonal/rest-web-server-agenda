import { RutManager } from "@/lib/rut-manager";
import { ExistenceValidation } from "@/lib/validations/existence.validation";
import { UpsertUserSchema } from "./schemas/api/upsert-user.schema";

export class UserValidations extends ExistenceValidation {
  static validateInsertPayload(body: any) {
    return UpsertUserSchema.omit({ status: true }).parse({
      ...body,
      rut: RutManager.format(body.rut, { dots: true })
    });
  }

  static validateUpdatePayload(body: any) {
    return UpsertUserSchema.omit({ status: true })
      .partial()
      .parse({
        ...body,
        rut: RutManager.format(body.rut, { dots: true })
      });
  }

  static validateUpdateStatusPayload(body: any) {
    return UpsertUserSchema.pick({ status: true }).partial().parse(body);
  }
}
