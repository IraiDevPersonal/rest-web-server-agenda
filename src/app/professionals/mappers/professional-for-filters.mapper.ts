import { CustomError } from "@/lib/custom-error";
import { ProfessionalForFiltersModel } from "../models/professional-for-filters.model";
import { BdProfessioanlForFiltersSchema } from "../schemas/bd/professional-for-filters.schema";

export class ProfessionalForFiltersMapper {
  static map = (raw: unknown): ProfessionalForFiltersModel => {
    const { success, error, data } = BdProfessioanlForFiltersSchema.safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, "ProfessionalForFiltersMapper.map");
    }

    return {
      value: `${data.id}`,
      label: `${data.names} ${data.last_names}`,
      professions: data.professions.map((profession) => `${profession.profession.id}`)
    };
  };

  static fromBdToDomain = (raw: unknown): ProfessionalForFiltersModel[] => {
    const { success, error, data } = BdProfessioanlForFiltersSchema.array().safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, "ProfessionalForFiltersMapper.fromBdToDomain");
    }

    return data.map(this.map);
  };
}
