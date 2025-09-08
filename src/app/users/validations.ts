import { ExistenceValidation } from '@/lib/validations/existence.validation';
import { PersonValidation } from '@/lib/validations/person.validation';
import z from 'zod';
import { UpsertUserSchema } from './schemas/api/upsert-user.schema';

const NumberIdsSchema = z.number().positive().min(1).int().array();

export class UserValidations extends ExistenceValidation {
  static validateInsertPayload(body: any) {
    return UpsertUserSchema.omit({ status: true }).parse({
      ...body,
      birth_date: PersonValidation.formatBirthDate(body.birth_date),
      rut: PersonValidation.formatRut(body.rut),
    });
  }

  static validateUpdatePayload(body: any) {
    return UpsertUserSchema.omit({ status: true })
      .partial()
      .parse({
        ...body,
        birth_date: PersonValidation.formatBirthDate(body.birth_date),
        rut: PersonValidation.formatRut(body.rut),
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
