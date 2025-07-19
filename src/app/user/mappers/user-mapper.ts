import { type UserModel, UserSchema } from "../models/user";

import { RoleMapper } from "@/app/role/mappers/role-mapper";

import { CustomError } from "@/lib/custom-error";
import { safeArray } from "@/lib/utils";
import { BdUser } from "@/types/bd-model";

type BdUserWithRole = BdUser<{
  include: {
    role: {
      select: {
        id: true;
        name: true;
      };
    };
  };
}>;

export class UserMapper {
  static validate(item: BdUserWithRole): UserModel {
    try {
      const data = UserMapper.mapper(item);
      return UserSchema.parse(data);
    } catch (error) {
      throw CustomError.internalServer(
        CustomError.getErrorMessage(error, "user-mapper.ts (validate)")
      );
    }
  }

  static response(data: BdUserWithRole[]): UserModel[] {
    return safeArray(data, {
      errorMessage: "user-mapper (response): Se esperaba un arreglo de usuarios"
    }).map(UserMapper.validate);
  }

  private static mapper(item: BdUserWithRole): UserModel {
    return {
      email: item.email,
      uid: item.uid,
      rut: item.rut,
      names: item.names,
      last_names: item.last_names,
      is_admin: item.is_admin,
      phone: item.phone,
      password: item.password,
      role_id: item.role_id,
      id: item?.id,
      role: RoleMapper.validate(item.role)
    };
  }
}
