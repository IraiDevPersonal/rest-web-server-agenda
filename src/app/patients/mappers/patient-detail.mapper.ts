import { type PatientModel } from "../models/patient.model";

import { PatientMapper } from "./patient.mapper";

export class PatientDetailMapper {
  static fromBdToDomain(raw: unknown): PatientModel {
    return PatientMapper.map(raw);
  }
}
