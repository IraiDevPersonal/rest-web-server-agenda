import {
  type ProfessionalOptionModel,
  ProfessionalOptionSchema
} from "../models/professional-to-filter";

import { CustomError } from "@/lib/custom-error";
import { safeArray } from "@/lib/utils";

export class ProfessionalToFilterMapper {
  static validate(item: any): ProfessionalOptionModel {
    try {
      const data = ProfessionalToFilterMapper.mapper(item);
      return ProfessionalOptionSchema.parse(data);
    } catch (error) {
      throw CustomError.internalServer(
        CustomError.getErrorMessage(
          error,
          "profession-to-filter-mapper.ts: (validate)"
        )
      );
    }
  }

  static response(data: any): ProfessionalOptionModel[] {
    return safeArray<ProfessionalOptionModel>(data, {
      errorMessage:
        "professional-to-filter-mapper.ts (response): se esperaba un array"
    }).map(ProfessionalToFilterMapper.validate);
  }

  private static mapper(item: any): ProfessionalOptionModel {
    const user = item?.user;
    const professions = safeArray<any>(item?.professional_profession);

    return {
      value: `${item?.id}`,
      label: `${user?.names ?? "sin nombre"} ${user?.last_names ?? "sin nombre"}`,
      professions: professions
        .map((i) => (i?.profession_id ? `${i?.profession_id}` : ""))
        .filter(Boolean)
    };
  }
}
