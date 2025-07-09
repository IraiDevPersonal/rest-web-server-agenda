import { CustomError } from "@/lib/custom-error";
import { isValidObject, safeArray } from "@/lib/utils";

type Init = {
  id: number;
  name: string;
}

export class ProfessionEntity {
  public id: Init["id"];
  public name: Init["name"];

  private constructor(init: Init) {
    this.id = init.id;
    this.name = init.name;
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

  private static itemAdapter(item: any): ProfessionEntity {
    const message = "profession-entity.ts: (itemAdapter) entreada no esperada, se esperaba un objeto"

    if (!isValidObject(item, message)) {
      throw new Error(message);
    }

    return {
      id: item["id"],
      name: item["name"],
    };
  }
}
