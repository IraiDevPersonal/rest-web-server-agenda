import {
  type ProfessionalOptionModel,
  ProfessionalOptionSchema
} from "../models/professional-to-filter";

import { CustomError } from "@/lib/custom-error";
import { safeArray } from "@/lib/utils";
import { BdUser } from "@/types/bd-model";

type BdProfessionalWithProfessions = BdUser<{
  select: {
    id: true;
    names: true;
    last_names: true;
    professions: {
      select: {
        profession_id: true;
      };
    };
  };
}>;

export class ProfessionalForFiltersMapper {
  private static _mapper(item: BdProfessionalWithProfessions): ProfessionalOptionModel {
    const professions = item.professions;

    return {
      value: `${item.id}`,
      label: `${item.names} ${item.last_names}`,
      professions: professions
        .map((i) => (i.profession_id ? `${i.profession_id}` : ""))
        .filter(Boolean)
    };
  }

  static validate(item: BdProfessionalWithProfessions): ProfessionalOptionModel {
    try {
      const data = ProfessionalForFiltersMapper._mapper(item);
      return ProfessionalOptionSchema.parse(data);
    } catch (error) {
      throw CustomError.internalServer(
        CustomError.getErrorMessage(error, "profession-to-filter-mapper.ts: (validate)")
      );
    }
  }

  static response(data: BdProfessionalWithProfessions[]): ProfessionalOptionModel[] {
    return safeArray(data, {
      errorMessage: "professional-to-filter-mapper.ts (response): se esperaba un array"
    }).map(ProfessionalForFiltersMapper.validate);
  }
}
