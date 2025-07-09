import { CustomError } from "@/lib/custom-error";
import { isValidObject, safeArray } from "@/lib/utils";
import { Option } from "@/types/global-types";

export class ProfessionToFilterEntity {
  public value: string;
  public label: string;

  private constructor(init: Option) {
    this.value = `${init.value}`;
    this.label = init.label;
  }

  static responseAdapter(data: any): ProfessionToFilterEntity[] {
    try {
      return safeArray<ProfessionToFilterEntity>(data).map(ProfessionToFilterEntity.itemAdapter);
    } catch (error) {
      const errorMessage = CustomError.getErrorMessage(
        error,
        "profession-to-filter-entity.ts: (responseAdapter) error inesperado"
      );

      throw new Error(errorMessage);
    }
  }

  private static itemAdapter(item: any) {
    const message = "profession-to-filter-entity.ts: (itemAdapter) entreada no esperada, se esperaba un objeto"

    if (!isValidObject(item, message)) {
      throw new Error(message);
    }

    return {
      value: item["id"],
      label: item["name"],
    };
  }
}
