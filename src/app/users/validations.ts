import { RutManager } from "@/lib/rut-manager";
import { ExistenceValidation } from "@/lib/validations/existence.validation";
import { UpsertUserSchema } from "./schemas/api/upsert-user.schema";
import z from "zod";

const NumberIdsSchema = z.number().positive().min(1).int().array();

export class UserValidations extends ExistenceValidation {
  private static formatBirthDate(birth_date: any) {
    return birth_date ? new Date(birth_date) : undefined
  }

  private static formatRut(rut: any) {
    return rut ? RutManager.format(rut, { dots: true }) : undefined
  }

  static validateInsertPayload(body: any) {
    return UpsertUserSchema.omit({ status: true }).parse({
      ...body,
      birth_date: UserValidations.formatBirthDate(body.birth_date),
      rut: UserValidations.formatRut(body.rut)
    });
  }

  static validateUpdatePayload(body: any) {
    return UpsertUserSchema.omit({ status: true })
      .partial()
      .parse({
        ...body,
        birth_date: UserValidations.formatBirthDate(body.birth_date),
        rut: UserValidations.formatRut(body.rut)
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
