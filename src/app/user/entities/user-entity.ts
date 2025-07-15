import { type UserModel, UserSchema } from "../models/user";

import { RoleEntity } from "@/app/role/entities/role-entity";
import { CustomError } from "@/lib/custom-error";
import { safeArray } from "@/lib/utils";

export class UserEntity {
  static validate(item: any): UserModel {
    try {
      const data = UserEntity.mapper(item);
      return UserSchema.parse(data);
    } catch (error) {
      throw new Error(CustomError.getErrorMessage(error));
    }
  }

  static serverResponse(data: any): UserModel[] {
    try {
      return safeArray<UserModel>(data, {
        throwErrors: true,
        errorMessage: "Se esperaba un arreglo de usuarios"
      }).map(UserEntity.validate);
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(error, "user-entity.ts (serverResponse)")
      );
    }
  }

  private static mapper(item: any): UserModel {
    return {
      email: item?.email ?? "sin correo",
      uid: item?.uid ?? "sin uid",
      rut: item?.rut ?? "sin rut",
      names: item?.names ?? "sin nombres",
      last_names: item?.last_names ?? "sin apellidos",
      is_admin: item?.is_admin ?? false,
      phone: item?.phone ?? "sin teléfono",
      password: item?.password ?? "",
      role_id: item?.role_id ?? 0,
      role: RoleEntity.validate(item?.role),
      id: item?.id ?? null
    };
  }
}
