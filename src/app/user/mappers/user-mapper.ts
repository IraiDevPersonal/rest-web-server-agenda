import { type UserModel, UserSchema } from "../models/user";

import { CustomError } from "@/lib/custom-error";
import { safeArray } from "@/lib/utils";
import { BdUser } from "@/types/bd-model";

type BdUserWithRelations = BdUser<{
  include: {
    roles: true;
    appointments: true;
    professions: true;
  };
}>;

export class UserMapper {
  private static _mapper(item: BdUserWithRelations): UserModel {
    return {
      email: item.email,
      uid: item.uid,
      rut: item.rut,
      names: item.names,
      gender: item.gender,
      status: item.status,
      avatar_image: item?.avatar_image ?? "",
      last_names: item.last_names,
      phone: item.phone,
      password: item.password,
      id: item?.id

      // role: RoleMapper.validate(item.role)
    };
  }

  static validate(item: BdUserWithRelations): UserModel {
    try {
      const data = UserMapper._mapper(item);
      return UserSchema.parse(data);
    } catch (error) {
      throw CustomError.internalServer(
        CustomError.getErrorMessage(error, "user-mapper.ts (validate)")
      );
    }
  }

  static response(data: BdUserWithRelations[]): UserModel[] {
    return safeArray(data, {
      errorMessage: "user-mapper (response): Se esperaba un arreglo de usuarios"
    }).map(UserMapper.validate);
  }
}
