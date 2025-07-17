import { PatientModel } from "@/app/patient/models/patient";

declare module "express" {
  interface Request {
    patient?: PatientModel;
  }
}
