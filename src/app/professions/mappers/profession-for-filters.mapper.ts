import type { ProfessionOptionModel } from "../models/professional-for-filters.model";

import { CustomError } from "@/lib/custom-error";
import { ProfessionSchema } from "../schemas/bd/profession.schema";

export class ProfessionForFiltersMapper {
  static map(raw: unknown): ProfessionOptionModel {
    const { success, error, data } = ProfessionSchema.safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, "ProfessionForFiltersMapper.map");
    }

    return {
      label: data.name,
      value: `${data.id}`
    };
  }

  static fromBdToDomain(raw: unknown): ProfessionOptionModel[] {
    const { success, error, data } = ProfessionSchema.array().safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, "ProfessionForFiltersMapper.fromBdToDomain");
    }

    return data.map(this.map);
  }
}
