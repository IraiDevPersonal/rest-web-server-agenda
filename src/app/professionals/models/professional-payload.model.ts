import { UserStatus } from "@prisma/client";
import { ProfessionalDetailModel } from "./professional-detail.model";

export type ProfessionaPayload = Omit<ProfessionalDetailModel, "uid" | "roles" | "professions" | "status"> & {
  roles: number[];
  password: string;
  status: UserStatus;
  professions: number[];
};
