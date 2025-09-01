import { RoleMapper } from "@/app/roles/mappers/role.mapper";
import { UserWithPaginationModel, type UserModel } from "../models/user.model";
import { UserBdWithPaginationSchema, UserSchema } from "../schemas/bd/user.schema";

import { ProfessionMapper } from "@/app/professions/mappers/profession.mapper";
import { CustomError } from "@/lib/custom-error";
import { ResponseWithPagination } from "@/types/global";

export class UserMapper {
  static map = (raw: unknown): UserModel => {
    const { success, error, data } = UserSchema.safeParse(raw);

    if (!success) {
      throw CustomError.internalServer("UserMapper.map: " + CustomError.getError(error).message);
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

  static fromBdToDomain = (raw: ResponseWithPagination<unknown>): UserWithPaginationModel => {
    const { success, error, data } = UserBdWithPaginationSchema.safeParse(raw);

    if (!success) {
      throw CustomError.internalServer(
        "UserMapper.fromBdToDomain: " + CustomError.getError(error).message
      );
    }

    return {
      page: data.page,
      limit: data.limit,
      total: data.total,
      pages: data.pages,
      data: data.data.map(this.map)
    };
  };
}