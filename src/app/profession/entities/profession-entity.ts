import { z } from "zod";

import { CustomError } from "@/lib/custom-error";
import { safeArray } from "@/lib/utils";

const ProfessionSchema = z.object({
  id: z.number().positive(),
  name: z
    .string()
    .min(1, { message: "El nombre de la profesión no puede estar vacío" })
});

type ProfessionModel = z.infer<typeof ProfessionSchema>;

export class ProfessionEntity {
  public id: ProfessionModel["id"];
  public name: ProfessionModel["name"];

  private constructor(init: ProfessionModel) {
    this.id = init.id;
    this.name = init.name;
  }

  static getSchema() {
    return ProfessionSchema;
  }

  static validate(item: any): ProfessionModel {
    try {
      const data = ProfessionEntity.mapper(item);
      return ProfessionEntity.getSchema().parse(data);
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(error, "profession-entity.ts: (validate)")
      );
    }
  }

  static responseAdapter(data: any): ProfessionModel[] {
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
      id: Number(item.id),
      name: item.names ?? "profesión indeterminada"
    };
  }
}
