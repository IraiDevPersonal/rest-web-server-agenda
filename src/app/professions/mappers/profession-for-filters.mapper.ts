import { type ProfessionOptionModel } from "../models/professional-for-filters.model";

import { CustomError } from "@/lib/custom-error";
import { ProfessionSchema } from "../schemas/bd/profession.schema";

export class ProfessionForFiltersMapper {
  static map(raw: unknown): ProfessionOptionModel {
    const { success, error, data } = ProfessionSchema.safeParse(raw);

    if (!success) {
      throw CustomError.internalServer(
        "ProfessionForFiltersMapper.map" + CustomError.getError(error).message
      );
    }

    return {
      label: data.name,
      value: `${data.id}`
    };
  }

  static fromBdToDomain(raw: unknown): ProfessionOptionModel[] {
    const { success, error, data } = ProfessionSchema.array().safeParse(raw);

    if (!success) {
      throw CustomError.internalServer(
        "ProfessionForFiltersMapper.fromBdToDomain" + CustomError.getError(error).message
      );
    }

    return data.map(this.map);
  }
}
