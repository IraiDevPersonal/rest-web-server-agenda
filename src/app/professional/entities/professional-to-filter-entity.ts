import { z } from "zod";

import { CustomError } from "@/lib/custom-error";
import { safeArray } from "@/lib/utils";
import { OptionSchema } from "@/schemas/global";

const ProfessionalOptionSchema = OptionSchema.extend({
  professions: z.array(z.number()),
})

type ProfessionalOption = z.infer<typeof ProfessionalOptionSchema>

export class ProfessionalToFilterEntity {
  public value: ProfessionalOption["value"];
  public label: ProfessionalOption["label"];
  public professions: ProfessionalOption["professions"];

  private constructor(init: ProfessionalOption) {
    this.value = Number(init.value);
    this.label = init.label;
    this.professions = init.professions
  }

  static getSchema() {
    return ProfessionalOptionSchema
  }

  static validate(item: any): ProfessionalToFilterEntity {
    try {
      const data = ProfessionalToFilterEntity.itemAdapter(item)
      const professional = ProfessionalOptionSchema.parse(data)
      return new ProfessionalToFilterEntity(professional)
    } catch (error) {
      throw new Error(CustomError.getErrorMessage(
        error,
        "profession-to-filter-entity.ts: (validate) error inesperado"
      ))
    }
  }

  static responseAdapter(data: any): ProfessionalToFilterEntity[] {
    try {
      return safeArray<ProfessionalToFilterEntity>(data).map(ProfessionalToFilterEntity.validate);
    } catch (error) {
      const errorMessage = CustomError.getErrorMessage(
        error,
        "profession-to-filter-entity.ts: (responseAdapter) error inesperado"
      );
      throw new Error(errorMessage);
    }
  }

  private static itemAdapter(item: any): ProfessionalOption {
    const user = item["user"];
    const professions = safeArray<any>(item["professional_profession"])

    return {
      value: Number(item["id"]),
      label: `${user?.["names"]} ${user?.["last_names"]}`,
      professions: professions.map((i: any) => Number(i?.profession_id))
    }
  }
}
