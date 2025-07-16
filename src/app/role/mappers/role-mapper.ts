import { RoleSchema, type RoleModel } from "../models/role";

import { CustomError } from "@/lib/custom-error";
import { safeArray } from "@/lib/utils";

export class RoleMapper {
  static validate(object: any): RoleModel {
    try {
      const data = RoleMapper.mapper(object);
      return RoleSchema.parse(data);
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(error, "role-mapper.ts: (validate)")
      );
    }
  }

  static serverResponse(data: any): RoleModel[] {
    try {
      return safeArray<RoleModel>(data, {
        throwErrors: true,
        errorMessage: "Se esperaba un arreglo de roles"
      }).map(RoleMapper.validate);
    } catch (error) {
      throw new Error(CustomError.getErrorMessage(error));
    }
  }

  private static mapper(item: any): RoleModel {
    return {
      id: Number(item?.id),
      name: item?.name ?? "Rol indeterminado"
    };
  }
}
