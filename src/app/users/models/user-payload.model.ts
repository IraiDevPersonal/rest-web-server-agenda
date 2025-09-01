import { UserStatus } from "@prisma/client";
import { UserDetailModel } from "./user-detail.model";

export type UserPayload = Omit<UserDetailModel, "uid" | "roles" | "professions" | "status"> & {
  roles: number[];
  password: string;
  status: UserStatus;
  professions: number[];
};