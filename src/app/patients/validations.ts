import { ExistenceValidation } from '@/lib/validations/existence.validation';
import { PersonValidation } from '@/lib/validations/person.validation';
import { UpsertPatientApiSchema } from './schemas/api/upsert-patient.schema';

export class PatientValidations extends ExistenceValidation {
  static validateInsertPayload(body: any) {
    return UpsertPatientApiSchema.omit({ status: true }).parse({
      ...body,
      birth_date: PersonValidation.formatBirthDate(body.birth_date),
      rut: PersonValidation.formatRut(body.rut),
    });
  }

  static validateUpdatePayload(body: any) {
    return UpsertPatientApiSchema.omit({ status: true })
      .partial()
      .parse({
        ...body,
        birth_date: PersonValidation.formatBirthDate(body.birth_date),
        rut: PersonValidation.formatRut(body.rut),
      });
  }

  static validateUpdateStatusPayload(body: any) {
    return UpsertPatientApiSchema.pick({ status: true }).partial().parse(body);
  }
}
