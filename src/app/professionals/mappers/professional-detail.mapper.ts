import { CustomError } from "@/lib/custom-error";
import { ProfessionalDetailModel } from "../models/professional-detail.model";
import { ProfessionalDetailSchema } from "../schemas/bd/professional-detail.schema";
import { ProfessionalMapper } from "./professional.mapper";

export class ProfessionalDetailMapper {
  static map = (raw: unknown): ProfessionalDetailModel => {
    const { success, error, data } = ProfessionalDetailSchema.safeParse(raw);

    if (!success) {
      throw CustomError.internalServer(
        "ProfessionalDetailMapper.map: " + CustomError.getError(error).message
      );
    }

    return {
      ...ProfessionalMapper.map(data),
      gender: data.gender,
      birth_date: data.birth_date
    };
  };

  static fromBdToDomain = (raw: unknown): ProfessionalDetailModel => {
    return this.map(raw);
  };
}
