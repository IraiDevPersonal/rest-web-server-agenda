import { Gender } from "@prisma/client";
import { UserModel } from "./user.model";

export type UserDetailModel = {
  gender: Gender;
  birth_date?: Date;
} & UserModel;