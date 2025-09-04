import { MakeRequired, PaginatedResult, RutOrEmailQuery } from "@/types/global";
import { PatientModel } from "./models/patient.model";
import { PaginatedPatientQueryFilters } from "./models/patient-filters.model";

export type PatientServiceRepository = {
  getPatientByUid: (uid: string) => Promise<unknown | null>;
  createPatient: (payload: Omit<PatientModel, "uid">) => Promise<unknown>;
  getPatients: (filters: PaginatedPatientQueryFilters) => Promise<PaginatedResult>;
  updatePatient: (uid: string, payload: Partial<PatientModel>) => Promise<unknown>;
  findPatientRutAndEmail: (props: RutOrEmailQuery) => Promise<MakeRequired<RutOrEmailQuery, "uid"> | null>;
};
