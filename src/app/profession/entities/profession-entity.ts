import { type ProfessionModel, ProfessionSchema } from "../models/profession";

import { CustomError } from "@/lib/custom-error";
import { safeArray } from "@/lib/utils";

export class ProfessionEntity {
  static validate(item: any): ProfessionModel {
    try {
      const data = ProfessionEntity.mapper(item);
      return ProfessionSchema.parse(data);
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(error, "profession-entity.ts: (validate)")
      );
    }
  }

  static serverResponse(data: any): ProfessionModel[] {
    return ProfessionEntity.toArray(data);
  }

  static toArray(data: any[]): ProfessionModel[] {
    try {
      return safeArray<ProfessionModel>(data, {
        throwErrors: true,
        errorMessage: "Se esperaba un arreglo de profesiones"
      }).map(ProfessionEntity.mapper);
    } catch (error) {
      const errorMessage = CustomError.getErrorMessage(
        error,
        "profession-entity.ts: (toArray)"
      );
      throw new Error(errorMessage);
    }
  }

  private static mapper(item: any): ProfessionModel {
    return {
      id: item?.id ?? null,
      name: item.names ?? "profesión indeterminada"
    };
  }
}
