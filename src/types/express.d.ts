import { PatientMapper } from "@/app/patient/mappers/patient-mapper";

declare module "express" {
  interface Request {
    patient?: PatientMapper;
  }
}
