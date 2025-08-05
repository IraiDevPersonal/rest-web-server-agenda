import {
  type ProfessionalOptionModel,
  ProfessionalOptionSchema
} from "../models/professional-to-filter";

import { CustomError } from "@/lib/custom-error";
import { safeArray } from "@/lib/utils";
import { BdProfessional } from "@/types/bd-model";

type BdProfessionalWithProfessions = BdProfessional<{
  select: {
    id: true;
    user: {
      select: {
        names: true;
        last_names: true;
      };
    };
    professional_profession: {
      select: {
        profession_id: true;
      };
    };
  };
}>;

export class ProfessionalToFilterMapper {
  private static _mapper(item: BdProfessionalWithProfessions): ProfessionalOptionModel {
    const user = item.user;
    const professions = item.professional_profession;

    return {
      value: `${item.id}`,
      label: `${user.names} ${user.last_names}`,
      professions: professions
        .map((i) => (i.profession_id ? `${i.profession_id}` : ""))
        .filter(Boolean)
    };
  }

  static validate(item: BdProfessionalWithProfessions): ProfessionalOptionModel {
    try {
      const data = ProfessionalToFilterMapper._mapper(item);
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
    }).map(ProfessionalToFilterMapper.validate);
  }
}
