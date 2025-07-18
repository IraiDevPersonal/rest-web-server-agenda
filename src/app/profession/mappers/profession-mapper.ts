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

  static toArray(data: any[]): ProfessionModel[] {
    try {
      return safeArray<ProfessionModel>(data, {
        throwErrors: true,
        errorMessage: "Se esperaba un arreglo de profesiones"
      }).map(ProfessionMapper.mapper);
    } catch (error) {
      const errorMessage = CustomError.getErrorMessage(
        error,
        "profession-mapper.ts: (toArray)"
      );
      throw CustomError.internalServer(errorMessage);
    }
  }

  private static mapper(item: any): ProfessionModel {
    return {
      id: item?.id,
      name: item.name ?? "profesión indeterminada"
    };
  }
}
