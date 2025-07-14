import { z } from "zod";

import { CustomError } from "@/lib/custom-error";
import { safeArray } from "@/lib/utils";
import { OptionSchema } from "@/schemas/global";

const ProfessionalOptionSchema = OptionSchema.extend({
  professions: z.array(z.string())
});

type ProfessionalOptionModel = z.infer<typeof ProfessionalOptionSchema>;

export class ProfessionalToFilterEntity {
  public value: ProfessionalOptionModel["value"];
  public label: ProfessionalOptionModel["label"];
  public professions: ProfessionalOptionModel["professions"];

  private constructor(init: ProfessionalOptionModel) {
    this.value = init.value;
    this.label = init.label;
    this.professions = init.professions;
  }

  static getSchema() {
    return ProfessionalOptionSchema;
  }

  static validate(item: any): ProfessionalOptionModel {
    try {
      const data = ProfessionalToFilterEntity.mapper(item);
      return ProfessionalToFilterEntity.getSchema().parse(data);
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(
          error,
          "profession-to-filter-entity.ts: (validate)"
        )
      );
    }
  }

  static responseAdapter(data: any): ProfessionalOptionModel[] {
    try {
      return safeArray<ProfessionalOptionModel>(data, {
        throwErrors: true,
        errorMessage: "Se esperaba un arreglo de profesionales para filtrar"
      }).map(ProfessionalToFilterEntity.validate);
    } catch (error) {
      const errorMessage = CustomError.getErrorMessage(
        error,
        "profession-to-filter-entity.ts: (responseAdapter)"
      );
      throw new Error(errorMessage);
    }
  }

  private static mapper(item: any): ProfessionalOptionModel {
    const user = item?.user;
    const professions = safeArray<any>(item?.professional_profession);

    return {
      value: item?.id,
      label: `${user?.names ?? "sin nombre"} ${user?.last_names ?? "sin nombre"}`,
      professions: professions.map((i) => i?.profession_id).filter(Boolean)
    };
  }
}
