import { z } from "zod";

import { CustomError } from "@/lib/custom-error";
import { safeArray } from "@/lib/utils";
import { OptionSchema } from "@/schemas/global";

type ProfessionModel = z.infer<typeof OptionSchema>

export class ProfessionToFilterEntity {
  public value: ProfessionModel["value"];
  public label: ProfessionModel["label"];

  private constructor(init: ProfessionModel) {
    this.value = init.value;
    this.label = init.label;
  }

  static getSchema() {
    return OptionSchema
  }

  static validate(item: any): ProfessionToFilterEntity {
    try {
      const data = ProfessionToFilterEntity.itemAdapter(item)
      const profession = ProfessionToFilterEntity.getSchema().parse(data)
      return new ProfessionToFilterEntity(profession)
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(
          error,
          "profession-to-filter-entity.ts: (validate) error inesperado"
        ))
    }
  }

  static responseAdapter(data: any): ProfessionToFilterEntity[] {
    try {
      return safeArray<ProfessionToFilterEntity>(data, {
        throwErrors: true,
        errorMessage: "profession-to-filter-entity.ts: (responseAdapter) Se esperaba un arreglo",
      }).map(ProfessionToFilterEntity.itemAdapter);
    } catch (error) {
      const errorMessage = CustomError.getErrorMessage(
        error,
        "profession-to-filter-entity.ts: (responseAdapter) error inesperado"
      );

      throw new Error(errorMessage);
    }
  }

  private static itemAdapter(item: any): ProfessionModel {
    return {
      value: item["id"],
      label: item["name"],
    };
  }
}
