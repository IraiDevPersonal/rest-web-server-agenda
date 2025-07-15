import { RoleSchema, type RoleModel } from "../models/role";

import { CustomError } from "@/lib/custom-error";
import { safeArray } from "@/lib/utils";

export class RoleEntity {
  static validate(object: any): RoleModel {
    try {
      const data = RoleEntity.mapper(object);
      return RoleSchema.parse(data);
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(error, "role-entity.ts: (validate)")
      );
    }
  }

  static serverResponse(data: any): RoleModel[] {
    try {
      return safeArray<RoleModel>(data, {
        throwErrors: true,
        errorMessage: "Se esperaba un arreglo de roles"
      }).map(RoleEntity.validate);
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
