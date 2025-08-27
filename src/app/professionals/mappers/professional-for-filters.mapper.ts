import { type ProfessionalOptionModel } from "../models/professional-option.model";

import { CustomError } from "@/lib/custom-error";
import { ProfessionalForFiltersSchema } from "../schemas/bd/professional-for-filters.schema";

export class ProfessionalForFiltersMapper {
  static map = (raw: unknown): ProfessionalOptionModel => {
    const { success, error, data } = ProfessionalForFiltersSchema.safeParse(raw);

    if (!success) {
      throw CustomError.internalServer(
        "ProfessionalForFiltersMapper.map: " + CustomError.getError(error).message
      );
    }

    return {
      value: `${data.id}`,
      label: `${data.names} ${data.last_names}`,
      professions: data.professions.map((profession) => `${profession.profession.id}`)
    };
  };

  static fromBdToDomain = (raw: unknown): ProfessionalOptionModel[] => {
    const { success, error, data } = ProfessionalForFiltersSchema.array().safeParse(raw);

    if (!success) {
      throw CustomError.internalServer(
        "ProfessionalForFiltersMapper.fromBdToDomain: " + CustomError.getError(error).message
      );
    }

    return data.map(this.map);
  };
}
