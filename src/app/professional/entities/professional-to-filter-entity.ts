import { z } from 'zod';

import { CustomError } from '@/lib/custom-error';
import { safeArray } from '@/lib/utils';
import { OptionSchema } from '@/schemas/global';

const ProfessionalOptionSchema = OptionSchema.extend({
  professions: z.array(z.string())
});

type ProfessionalOptionModel = z.infer<typeof ProfessionalOptionSchema>;

export class ProfessionalToFilterEntity {
  public value: ProfessionalOptionModel['value'];
  public label: ProfessionalOptionModel['label'];
  public professions: ProfessionalOptionModel['professions'];

  private constructor(init: ProfessionalOptionModel) {
    this.value = String(init.value);
    this.label = String(init.label);
    this.professions = init.professions.map((p) => (p ? String(p) : p));
  }

  static getSchema() {
    return ProfessionalOptionSchema;
  }

  static validate(item: any): ProfessionalOptionModel {
    try {
      const data = ProfessionalToFilterEntity.itemAdapter(item);
      return ProfessionalToFilterEntity.getSchema().parse(data);
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(
          error,
          'profession-to-filter-entity.ts: (validate) error inesperado'
        )
      );
    }
  }

  static responseAdapter(data: any): ProfessionalOptionModel[] {
    try {
      return safeArray<ProfessionalOptionModel>(data, {
        throwErrors: true,
        errorMessage:
          'profession-to-filter-entity.ts: (responseAdapter) Se esperaba un arreglo'
      }).map(ProfessionalToFilterEntity.validate);
    } catch (error) {
      const errorMessage = CustomError.getErrorMessage(
        error,
        'profession-to-filter-entity.ts: (responseAdapter) error inesperado'
      );
      throw new Error(errorMessage);
    }
  }

  private static itemAdapter(item: any): ProfessionalToFilterEntity {
    const user = item['user'];
    const professions = safeArray<any>(item['professional_profession']);

    return new ProfessionalToFilterEntity({
      value: item['id'],
      label: user?.['names'] + user?.['last_names'],
      professions: professions.map((i) => i?.profession_id)
    });
  }
}
