import { CustomError } from "@/lib/custom-error";
import type { UserDetailModel } from "../models/user-detail.model";
import { UserDetailSchema } from "../schemas/bd/user-detail.schema";
import { UserMapper } from "./user.mapper";

export class UserDetailMapper {
  static map = (raw: unknown): UserDetailModel => {
    const { success, error, data } = UserDetailSchema.safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, "UserDetailMapper.map");
    }

    return {
      ...UserMapper.map(data),
      gender: data.gender,
      birth_date: data.birth_date
    };
  };

  static fromBdToDomain = (raw: unknown): UserDetailModel => {
    return this.map(raw);
  };
}
