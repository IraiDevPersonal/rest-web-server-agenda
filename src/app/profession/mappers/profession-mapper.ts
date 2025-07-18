import { type ProfessionModel, ProfessionSchema } from "../models/profession";

import { CustomError } from "@/lib/custom-error";
import { safeArray } from "@/lib/utils";
import { BdProfession } from "@/types/bd-model";

export class ProfessionMapper {
  static validate(item: BdProfession): ProfessionModel {
    try {
      const data = ProfessionMapper.mapper(item);
      return ProfessionSchema.parse(data);
    } catch (error) {
      throw CustomError.internalServer(
        CustomError.getErrorMessage(error, "profession-mapper.ts: (validate)")
      );
    }
  }

  static response(data: BdProfession[]): ProfessionModel[] {
    return ProfessionMapper.toArray(data);
  }

  static toArray(data: BdProfession[]): ProfessionModel[] {
    return safeArray(data, {
      errorMessage: "profession-mapper.ts (toArray): Se esperaba un array"
    }).map(ProfessionMapper.validate);
  }

  private static mapper(item: BdProfession): ProfessionModel {
    return {
      id: item.id,
      name: item.name
    };
  }
}
