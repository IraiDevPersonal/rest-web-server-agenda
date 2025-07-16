import { PatientMapper } from "@/app/patient/entities/patient-mapper";

declare module "express" {
  interface Request {
    patient?: PatientMapper;
  }
}
