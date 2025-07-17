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
      throw new Error(
        CustomError.getErrorMessage(
          error,
          "profession-to-filter-mapper.ts: (validate)"
        )
      );
    }
  }

  static response(data: any): ProfessionalOptionModel[] {
    try {
      return safeArray<ProfessionalOptionModel>(data, {
        throwErrors: true,
        errorMessage: "Se esperaba un arreglo de profesionales para filtrar"
      }).map(ProfessionalToFilterMapper.validate);
    } catch (error) {
      const errorMessage = CustomError.getErrorMessage(
        error,
        "profession-to-filter-mapper.ts: (response)"
      );
      throw new Error(errorMessage);
    }
  }

  private static mapper(item: any): ProfessionalOptionModel {
    const user = item?.user;
    const professions = safeArray<any>(item?.professional_profession);

    return {
      value: item?.id,
      label: `${user?.names ?? "sin nombre"} ${user?.last_names ?? "sin nombre"}`,
      professions: professions.map((i) => i?.profession_id).filter(Boolean)
    };
  }
}
