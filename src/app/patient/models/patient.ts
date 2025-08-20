import { ResponseWithPagination } from "@/types/global";
import { Gender, UserStatus } from "@prisma/client";

export type PatientModel = {
  uid: string;
  rut: string;
  names: string;
  email: string;
  phone: string;
  gender: Gender;
  address: string;
  birth_date: Date;
  status: UserStatus;
  last_names: string;
  avatar_image?: string | null;
};

export type PatientWithPaginationModel = ResponseWithPagination<PatientModel>;
