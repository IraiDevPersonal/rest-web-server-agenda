import { PatientEntity } from "@patients/domain/entities/patient_entity";
import { bigint } from "zod";

declare module "express" {
  interface Request {
    patient?: PatientEntity;
  }
}
