import { z } from "zod";

import { CustomError } from "@/lib/custom-error";
import { safeArray } from "@/lib/utils";
import { OptionSchema } from "@/schemas/global";

type ProfessionOptionModel = z.infer<typeof OptionSchema>;

export class ProfessionToFilterEntity {
  public value: ProfessionOptionModel["value"];
  public label: ProfessionOptionModel["label"];

  private constructor(init: ProfessionOptionModel) {
    this.value = init.value;
    this.label = init.label;
  }

  static getSchema() {
    return OptionSchema;
  }

  static validate(item: any): ProfessionOptionModel {
    try {
      const data = ProfessionToFilterEntity.mapper(item);
      return ProfessionToFilterEntity.getSchema().parse(data);
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(
          error,
          "profession-to-filter-entity.ts: (validate)"
        )
      );
    }
  }

  static responseAdapter(data: any): ProfessionOptionModel[] {
    try {
      return safeArray<ProfessionOptionModel>(data, {
        throwErrors: true,
        errorMessage: "Se esperaba un arreglo de profesiones para filtros"
      }).map(ProfessionToFilterEntity.mapper);
    } catch (error) {
      const errorMessage = CustomError.getErrorMessage(
        error,
        "profession-to-filter-entity.ts: (responseAdapter)"
      );
      throw new Error(errorMessage);
    }
  }

  private static mapper(item: any): ProfessionToFilterEntity {
    return new ProfessionToFilterEntity({
      value: `${item.id}`,
      label: item.name ?? "profesión indeterminada"
    });
  }
}
