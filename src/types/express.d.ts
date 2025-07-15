import { PatientEntity } from "@/app/patient/entities/patient-entity";

declare module "express" {
  interface Request {
    patient?: PatientEntity;
  }
}
