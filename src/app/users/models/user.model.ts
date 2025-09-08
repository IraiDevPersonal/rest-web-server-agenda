import type { ProfessionModel } from "@/app/professions/models/profession.model";
import type { ResponseWithPagination } from "@/types/global";
import type { UserStatus } from "@prisma/client";
import type { RoleMapper } from "../../roles/mappers/role.mapper";

export type UserModel = {
  uid: string;
  rut: string;
  email: string;
  names: string;
  phone: string;
  address: string;
  last_names: string;
  status: UserStatus;
  roles: RoleMapper[];
  avatar_image: string | null;
  professions?: ProfessionModel[];
};

export type UserWithPaginationModel = ResponseWithPagination<UserModel>;
