import { UserStatus } from "@prisma/client";
import { RoleMapper } from "../../roles/mappers/role.mapper";
import { ProfessionModel } from "@/app/professions/models/profession.model";

export type ProfessionalModel = {
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
  professions: ProfessionModel[];
};
