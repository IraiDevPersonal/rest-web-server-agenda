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
      throw CustomError.internalServer(
        CustomError.getErrorMessage(
          error,
          "profession-to-filter-mapper.ts: (validate)"
        )
      );
    }
  }

  static response(data: any): ProfessionOptionModel[] {
    return safeArray<ProfessionOptionModel>(data, {
      errorMessage:
        "profession-to-filter-mapper.ts (response): Se esperaba un array"
    }).map(ProfessionToFilterMapper.mapper);
  }

  private static mapper(item: any): ProfessionOptionModel {
    return {
      value: `${item.id}`,
      label: item.name ?? "profesión indeterminada"
    };
  }
}
