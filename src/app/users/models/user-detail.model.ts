import type { Gender } from "@prisma/client";
import type { UserModel } from "./user.model";

export type UserDetailModel = {
  gender: Gender;
  birth_date?: Date;
} & UserModel;