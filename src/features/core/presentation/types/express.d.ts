import { PatientEntity } from "@patients/domain/entities/patient_entity";

declare module "express" {
  interface Request {
    patient?: PatientEntity;
  }
}
