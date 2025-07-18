import { type ProfessionOptionModel } from "../models/professional-to-filter";

import { CustomError } from "@/lib/custom-error";
import { OptionSchema } from "@/lib/schemas/global";
import { safeArray } from "@/lib/utils";
import { BdProfession } from "@/types/bd-model";

export class ProfessionToFilterMapper {
  static validate(item: BdProfession): ProfessionOptionModel {
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

  static response(data: BdProfession[]): ProfessionOptionModel[] {
    return safeArray(data, {
      errorMessage:
        "profession-to-filter-mapper.ts (response): Se esperaba un array"
    }).map(ProfessionToFilterMapper.validate);
  }

  private static mapper(item: BdProfession): ProfessionOptionModel {
    return {
      value: `${item.id}`,
      label: item.name
    };
  }
}
