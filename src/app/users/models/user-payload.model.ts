import { UserStatus } from "@prisma/client";
import { UserDetailModel } from "./user-detail.model";

export type UpsertUserPayload = Omit<UserDetailModel, "uid" | "roles" | "professions" | "status"> & {
  status: UserStatus;
  password: string;
};
