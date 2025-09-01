import { CustomError } from "@/lib/custom-error";
import { ProfessionModel } from "../models/profession.model";
import { ProfessionSchema } from "../schemas/bd/profession.schema";

export class ProfessionMapper {
  static map(raw: unknown): ProfessionModel {
    const { success, error, data } = ProfessionSchema.safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, "ProfessionMapper.map");
    }

    return {
      id: data.id,
      name: data.name
    };
  }

  static fromBdToDomain(raw: unknown): ProfessionModel[] {
    const { success, error, data } = ProfessionSchema.array().safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, "ProfessionMapper.fromBdToDomain");
    }

    return data.map(this.map);
  }
}
