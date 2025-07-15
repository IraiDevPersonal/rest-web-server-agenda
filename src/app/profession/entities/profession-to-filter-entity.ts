import { type ProfessionOptionModel } from "../models/professional-to-filter";

import { CustomError } from "@/lib/custom-error";
import { OptionSchema } from "@/lib/schemas/global";
import { safeArray } from "@/lib/utils";

export class ProfessionToFilterEntity {
  static validate(item: any): ProfessionOptionModel {
    try {
      const data = ProfessionToFilterEntity.mapper(item);
      return OptionSchema.parse(data);
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(
          error,
          "profession-to-filter-entity.ts: (validate)"
        )
      );
    }
  }

  static serverResponse(data: any): ProfessionOptionModel[] {
    try {
      return safeArray<ProfessionOptionModel>(data, {
        throwErrors: true,
        errorMessage: "Se esperaba un arreglo de profesiones para filtros"
      }).map(ProfessionToFilterEntity.mapper);
    } catch (error) {
      const errorMessage = CustomError.getErrorMessage(
        error,
        "profession-to-filter-entity.ts: (serverResponse)"
      );
      throw new Error(errorMessage);
    }
  }

  private static mapper(item: any): ProfessionOptionModel {
    return {
      value: `${item.id}`,
      label: item.name ?? "profesión indeterminada"
    };
  }
}
