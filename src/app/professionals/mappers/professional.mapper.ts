import { RoleMapper } from "@/app/roles/mappers/role.mapper";
import { type ProfessionalModel } from "../models/professional.model";
import { ProfessionalSchema } from "../schemas/bd/professional.schema";

import { CustomError } from "@/lib/custom-error";
import { ProfessionMapper } from "@/app/professions/mappers/profession.mapper";
import { ResponseWithPaginationSchema } from "@/lib/schemas/global";
import { ResponseWithPagination } from "@/types/global";

export class ProfessionalMapper {
  static map = (raw: unknown): ProfessionalModel => {
    const { success, error, data } = ProfessionalSchema.safeParse(raw);

    if (!success) {
      throw CustomError.internalServer("ProfessionalMapper.map: " + CustomError.getError(error).message);
    }

    return {
      uid: data.uid,
      rut: data.rut,
      phone: data.phone,
      email: data.email,
      names: data.names,
      status: data.status,
      address: data.address,
      last_names: data.last_names,
      avatar_image: data.avatar_image,
      roles: data.roles.map(({ role }) => RoleMapper.map(role)),
      professions: data.professions.map(({ profession }) => ProfessionMapper.map(profession))
    };
  };

  static fromBdToDomain = (raw: unknown): ResponseWithPagination<ProfessionalModel> => {
    const { success, error, data } = ResponseWithPaginationSchema(ProfessionalSchema).safeParse(raw);

    if (!success) {
      throw CustomError.internalServer(
        "ProfessionalMapper.fromBdToDomain: " + CustomError.getError(error).message
      );
    }

    return {
      data: data.data.map(this.map),
      limit: data.limit,
      total: data.total,
      pages: data.pages,
      page: data.page
    };
  };
}
