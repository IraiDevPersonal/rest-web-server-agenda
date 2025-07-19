import { RoleSchema, type RoleModel } from "../models/role";

import { CustomError } from "@/lib/custom-error";
import { safeArray } from "@/lib/utils";
import { BdRole } from "@/types/bd-model";

export class RoleMapper {
  static validate(object: BdRole): RoleModel {
    try {
      const data = RoleMapper.mapper(object);
      return RoleSchema.parse(data);
    } catch (error) {
      throw CustomError.internalServer(
        CustomError.getErrorMessage(error, "role-mapper.ts: (validate)")
      );
    }
  }

  static response(data: BdRole[]): RoleModel[] {
    return safeArray(data, {
      errorMessage: "role-mapper.ts (response): Se esperaba un array"
    }).map(RoleMapper.validate);
  }

  private static mapper(item: BdRole): RoleModel {
    return {
      id: item.id,
      name: item.name
    };
  }
}
