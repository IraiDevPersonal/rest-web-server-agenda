import { type ProfessionOptionModel } from "../models/professional-for-filters";

import { CustomError } from "@/lib/custom-error";
import { OptionSchema } from "@/lib/schemas/global";
import { safeArray } from "@/lib/utils";
import { BdProfession } from "@/types/bd-model";

export class ProfessionForFiltersMapper {
  private static _mapper(item: BdProfession): ProfessionOptionModel {
    return {
      value: `${item.id}`,
      label: item.name
    };
  }

  static validate(item: BdProfession): ProfessionOptionModel {
    try {
      const data = ProfessionForFiltersMapper._mapper(item);
      return OptionSchema.parse(data);
    } catch (error) {
      throw CustomError.internalServer(
        CustomError.getErrorMessage(error, "profession-to-filter-mapper.ts: (validate)")
      );
    }
  }

  static response(data: BdProfession[]): ProfessionOptionModel[] {
    return safeArray(data, {
      errorMessage: "profession-to-filter-mapper.ts (response): Se esperaba un array"
    }).map(ProfessionForFiltersMapper.validate);
  }
}
