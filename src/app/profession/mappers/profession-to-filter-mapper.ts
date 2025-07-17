import { type ProfessionOptionModel } from "../models/professional-to-filter";

import { CustomError } from "@/lib/custom-error";
import { OptionSchema } from "@/lib/schemas/global";
import { safeArray } from "@/lib/utils";

export class ProfessionToFilterMapper {
  static validate(item: any): ProfessionOptionModel {
    try {
      const data = ProfessionToFilterMapper.mapper(item);
      return OptionSchema.parse(data);
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(
          error,
          "profession-to-filter-mapper.ts: (validate)"
        )
      );
    }
  }

  static response(data: any): ProfessionOptionModel[] {
    try {
      return safeArray<ProfessionOptionModel>(data, {
        throwErrors: true,
        errorMessage: "Se esperaba un arreglo de profesiones para filtros"
      }).map(ProfessionToFilterMapper.mapper);
    } catch (error) {
      const errorMessage = CustomError.getErrorMessage(
        error,
        "profession-to-filter-mapper.ts: (response)"
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
