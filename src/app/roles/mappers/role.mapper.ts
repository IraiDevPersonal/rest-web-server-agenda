import { type RoleModel } from "../models/role";
import { RoleSchema } from "../schemas/bd/role.schema";

import { CustomError } from "@/lib/custom-error";

export class RoleMapper {
  static map = (raw: unknown): RoleModel => {
    const { success, error, data } = RoleSchema.safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, "RoleMapper.map");
    }

    return {
      id: data.id,
      name: data.name
    };
  };

  static toArray = (raw: unknown): RoleModel[] => {
    console.log({ raw });
    const { success, error, data } = RoleSchema.array().safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, "RoleMapper.fromBdToDomain");
    }

    return data.map(this.map);
  };
}
