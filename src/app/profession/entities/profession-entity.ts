import { z } from "zod";

import { CustomError } from "@/lib/custom-error";
import { safeArray } from "@/lib/utils";

const ProfessionSchema = z.object({
  id: z.number().positive(),
  name: z.string().min(1, { message: "El nombre de la profesión no puede estar vacío" }),
})

type ProfessionModel = z.infer<typeof ProfessionSchema>

export class ProfessionEntity {
  public id: ProfessionModel["id"];
  public name: ProfessionModel["name"];

  private constructor(init: ProfessionModel) {
    this.id = init.id;
    this.name = init.name;
  }

  static getSchema() {
    return ProfessionSchema
  }

  static validate(item: any): ProfessionEntity {
    try {
      const data = ProfessionEntity.itemAdapter(item)
      const profession = ProfessionEntity.getSchema().parse(data)
      return new ProfessionEntity(profession)
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(
          error,
          "profession-entity.ts: (validate) error inesperado"
        )
      )
    }
  }

  static responseAdapter(data: any): ProfessionEntity[] {
    try {
      return safeArray<ProfessionEntity>(data, {
        throwErrors: true,
        errorMessage: "profession-entity.ts: (responseAdapter) Se esperaba un arreglo",
      }).map(ProfessionEntity.itemAdapter);
    } catch (error) {
      const errorMessage = CustomError.getErrorMessage(
        error,
        "profession-entity.ts: (responseAdapter) error inesperado"
      );
      throw new Error(errorMessage);
    }
  }

  private static itemAdapter(item: any): ProfessionModel {
    return {
      id: item["id"],
      name: item["name"],
    };
  }
}
