import { RutManager } from "@/lib/rut-manager";
import { ExistenceValidation } from "@/lib/validations/existence.validation";
import { UpsertUserSchema } from "./schemas/api/upsert-user.schema";
import z from "zod";

const NumberIdsSchema = z.number().positive().min(1).int().array();

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

  static validateRoleIds(raw: unknown) {
    return z.object({ roles: NumberIdsSchema }).parse(raw);
  }

  static validateProfessionIds(raw: unknown) {
    return z.object({ professions: NumberIdsSchema }).parse(raw);
  }
}
