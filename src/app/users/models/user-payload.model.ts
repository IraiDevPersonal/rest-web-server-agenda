import { UserDetailModel } from "./user-detail.model";

export type UpsertUserPayload = Omit<UserDetailModel, "uid" | "roles" | "professions"> & {
  password: string;
};
