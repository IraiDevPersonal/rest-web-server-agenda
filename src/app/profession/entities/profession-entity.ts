import { z } from "zod";

import { CustomError } from "@/lib/custom-error";
import { safeArray } from "@/lib/utils";

const ProfessionSchema = z.object({
  id: z.number().positive(),
  name: z.string(),
})

type Init = z.infer<typeof ProfessionSchema>

export class ProfessionEntity {
  public id: Init["id"];
  public name: Init["name"];

  private constructor(init: Init) {
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
      return safeArray<ProfessionEntity>(data).map(ProfessionEntity.itemAdapter);
    } catch (error) {
      const errorMessage = CustomError.getErrorMessage(
        error,
        "profession-entity.ts: (responseAdapter) error inesperado"
      );
      throw new Error(errorMessage);
    }
  }

  private static itemAdapter(item: any): Init {
    return {
      id: item["id"],
      name: item["name"],
    };
  }
}
