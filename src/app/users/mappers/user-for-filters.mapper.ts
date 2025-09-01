import { type UserForFiltersModel } from "../models/user-for-filters.model";

import { CustomError } from "@/lib/custom-error";
import { UserForFiltersSchema } from "../schemas/bd/user-for-filters.schema";

export class UserForFiltersMapper {
  static map = (raw: unknown): UserForFiltersModel => {
    const { success, error, data } = UserForFiltersSchema.safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, "UserForFiltersMapper.map");
    }

    return {
      value: `${data.id}`,
      label: `${data.names} ${data.last_names}`,
      professions: data.professions.map((profession) => `${profession.profession.id}`)
    };
  };

  static fromBdToDomain = (raw: unknown): UserForFiltersModel[] => {
    const { success, error, data } = UserForFiltersSchema.array().safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, "UserForFiltersMapper.fromBdToDomain");
    }

    return data.map(this.map);
  };
}
