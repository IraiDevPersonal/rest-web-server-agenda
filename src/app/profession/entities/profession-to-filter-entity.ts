import { z } from "zod";

import { CustomError } from "@/lib/custom-error";
import { safeArray } from "@/lib/utils";
import { OptionSchema } from "@/schemas/global";

type ProfessionOptionModel = z.infer<typeof OptionSchema>

export class ProfessionToFilterEntity {
  public value: ProfessionOptionModel["value"];
  public label: ProfessionOptionModel["label"];

  private constructor(init: ProfessionOptionModel) {
    this.value = String(init.value);
    this.label = String(init.label);
  }

  static getSchema() {
    return OptionSchema
  }

  static validate(item: any): ProfessionOptionModel {
    try {
      const data = ProfessionToFilterEntity.itemAdapter(item)
      return ProfessionToFilterEntity.getSchema().parse(data)
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(
          error,
          "profession-to-filter-entity.ts: (validate) error inesperado"
        ))
    }
  }

  static responseAdapter(data: any): ProfessionOptionModel[] {
    try {
      return safeArray<ProfessionOptionModel>(data, {
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

  private static itemAdapter(item: any): ProfessionToFilterEntity {
    return new ProfessionToFilterEntity({
      value: item["id"],
      label: item["name"],
    });
  }
}
