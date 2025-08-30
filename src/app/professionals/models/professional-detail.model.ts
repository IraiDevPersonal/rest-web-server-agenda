import { Gender } from "@prisma/client";
import { ProfessionalModel } from "./professional.model";

export type ProfessionalDetailModel = {
  gender: Gender;
  birth_date?: Date;
} & ProfessionalModel;
