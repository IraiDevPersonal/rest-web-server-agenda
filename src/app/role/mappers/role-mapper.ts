import { RoleSchema, type RoleModel } from "../models/role";

import { CustomError } from "@/lib/custom-error";
import { safeArray } from "@/lib/utils";

export class RoleMapper {
  static validate(object: any): RoleModel {
    try {
      const data = RoleMapper.mapper(object);
      return RoleSchema.parse(data);
    } catch (error) {
      throw CustomError.internalServer(
        CustomError.getErrorMessage(error, "role-mapper.ts: (validate)")
      );
    }
  }

  static response(data: any): RoleModel[] {
    return safeArray<RoleModel>(data, {
      errorMessage: "role-mapper.ts (response): Se esperaba un array"
    }).map(RoleMapper.validate);
  }

  private static mapper(item: any): RoleModel {
    return {
      id: item?.id,
      name: item?.name ?? "Rol indeterminado"
    };
  }
}
