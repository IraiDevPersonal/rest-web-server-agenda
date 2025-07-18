import { type ProfessionModel, ProfessionSchema } from "../models/profession";

import { CustomError } from "@/lib/custom-error";
import { safeArray } from "@/lib/utils";

export class ProfessionMapper {
  static validate(item: any): ProfessionModel {
    try {
      const data = ProfessionMapper.mapper(item);
      return ProfessionSchema.parse(data);
    } catch (error) {
      throw CustomError.internalServer(
        CustomError.getErrorMessage(error, "profession-mapper.ts: (validate)")
      );
    }
  }

  static response(data: any): ProfessionModel[] {
    return ProfessionMapper.toArray(data);
  }

  static toArray(data: any): ProfessionModel[] {
    return safeArray<ProfessionModel>(data, {
      errorMessage: "profession-mapper.ts (toArray): Se esperaba un array"
    }).map(ProfessionMapper.mapper);
  }

  private static mapper(item: any): ProfessionModel {
    return {
      id: item?.id,
      name: item.name ?? "profesión indeterminada"
    };
  }
}
