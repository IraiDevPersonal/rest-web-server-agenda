import { UserStatus } from "@prisma/client";

export type ProfessionalModel = {
  uid: string;
  rut: string;
  email: string;
  names: string;
  phone: string;
  address: string;
  last_names: string;
  status: UserStatus;
  avatar_image: string | null;
  roles: { id: number; name: string }[];
  professions: { id: number; name: string }[];
};
