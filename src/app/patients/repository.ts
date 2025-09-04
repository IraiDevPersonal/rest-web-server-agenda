import { MakeRequired, PaginatedResult, RutOrEmailQuery } from "@/types/global";
import { PatientModel } from "./models/patient.model";

export type PatientServiceRepository<TFilters extends object> = {
  getPatientByUid: (uid: string) => Promise<unknown | null>;
  getPatients: (filters: TFilters) => Promise<PaginatedResult>;
  createPatient: (payload: Omit<PatientModel, "uid">) => Promise<unknown>;
  updatePatient: (uid: string, payload: Partial<PatientModel>) => Promise<unknown>;
  findPatientRutAndEmail: (props: RutOrEmailQuery) => Promise<MakeRequired<RutOrEmailQuery, "uid"> | null>;
};
