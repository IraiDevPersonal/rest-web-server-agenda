import { CustomError } from "@/lib/custom-error";
import { isValidObject, safeArray } from "@/lib/utils";
import { Option } from "@/types/global-types";

type ProfessionalOption = Option<{ professions: number[] }>

export class ProfessionalToFilterEntity {
  public value: ProfessionalOption["value"];
  public label: ProfessionalOption["label"];
  public professions: ProfessionalOption["professions"];

  private constructor(init: ProfessionalOption) {
    this.value = Number(init.value);
    this.label = init.label;
    this.professions = init.professions
  }

  static responseAdapter(data: any): ProfessionalToFilterEntity[] {
    try {
      return safeArray<ProfessionalToFilterEntity>(data).map(ProfessionalToFilterEntity.itemAdapter);
    } catch (error) {
      const errorMessage = CustomError.getErrorMessage(
        error,
        "profession-to-filter-entity.ts: (responseAdapter) error inesperado"
      );

      throw new Error(errorMessage);
    }
  }

  private static itemAdapter(item: any): ProfessionalOption {
    const message = "profession-to-filter-entity.ts: (itemAdapter) entreada no esperada, se esperaba un objeto"

    if (!isValidObject(item, message)) {
      throw new Error(message);
    }

    const user = item["user"]
    const professions = item["professional_profession"] ?? []

    return {
      value: Number(item["id"]),
      label: `${user?.["names"] ?? "Sin nombres"} ${user?.["last_names"] ?? "Sin apellidos"}`,
      professions: professions.map((i: any) => Number(i?.profession_id ?? 0))
    };
  }
}
