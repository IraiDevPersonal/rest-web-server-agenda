import { type UserModel, UserSchema } from "../models/user";

import { RoleMapper } from "@/app/role/mappers/role-mapper";

import { CustomError } from "@/lib/custom-error";
import { safeArray } from "@/lib/utils";
import { Uid } from "@/lib/uid";

export class UserMapper {
  static validate(item: any): UserModel {
    try {
      const data = UserMapper.mapper(item);
      return UserSchema.parse(data);
    } catch (error) {
      throw CustomError.internalServer(
        CustomError.getErrorMessage(error, "user-mapper.ts (validate)")
      );
    }
  }

  static response(data: any): UserModel[] {
    return safeArray<UserModel>(data, {
      errorMessage: "user-mapper (response): Se esperaba un arreglo de usuarios"
    }).map(UserMapper.validate);
  }

  private static mapper(item: any): UserModel {
    return {
      email: item?.email ?? "sin correo",
      uid: item?.uid ?? Uid.createV4(),
      rut: item?.rut ?? "sin rut",
      names: item?.names ?? "sin nombres",
      last_names: item?.last_names ?? "sin apellidos",
      is_admin: item?.is_admin ?? false,
      phone: item?.phone ?? "sin teléfono",
      password: item?.password ?? "",
      role_id: item?.role_id ?? 0,
      role: RoleMapper.validate(item?.role),
      id: item?.id
    };
  }
}
