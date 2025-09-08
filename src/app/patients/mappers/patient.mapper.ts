import type { ResponseWithPagination } from "@/types/global";
import type { PatientWithPaginationModel, PatientModel } from "../models/patient.model";
import { PatientBdSchema, PatientBdWithPaginationSchema } from "../schemas/bd/patient.schema";

import { CustomError } from "@/lib/custom-error";

export class PatientMapper {
  static map(raw: unknown): PatientModel {
    const { success, data, error } = PatientBdSchema.safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, "PatientMapper.map");
    }

    return {
      uid: data.uid,
      rut: data.rut,
      names: data.names,
      email: data.email,
      phone: data.phone,
      status: data.status,
      gender: data.gender,
      address: data.address,
      birth_date: data.birth_date,
      last_names: data.last_names,
      avatar_image: data.avatar_image ?? null
    };
  }

  static fromBdToDomain(raw: ResponseWithPagination<unknown>): PatientWithPaginationModel {
    const { success, data, error } = PatientBdWithPaginationSchema.safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, "PatientMapper.fromBdToDomain");
    }
    return {
      page: data.page,
      limit: data.limit,
      total: data.total,
      pages: data.pages,
      data: data.data.map(this.map)
    };
  }
}
