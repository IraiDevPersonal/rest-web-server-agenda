import { PatientWithPaginationModel, type PatientModel } from "../models/patient";
import {
  BdPatientSchema,
  BdPatientWithPaginationSchema
} from "../schemas/bd/patient-schema";

import { CustomError } from "@/lib/custom-error";
import { parseQuery } from "@/lib/utils";
import { UserStatus } from "@prisma/client";
import { Request } from "express";
import { PatientFilters } from "../models/patient-filters";

export class PatientMapper {
  static map(raw: unknown): PatientModel {
    const { success, data, error } = BdPatientSchema.safeParse(raw);

    if (!success) {
      throw CustomError.internalServer(
        CustomError.getErrorMessage(error, "patient-mapper.ts: (map)")
      );
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

  static fromBdToDomain(raw: unknown): PatientWithPaginationModel {
    const { success, data, error } = BdPatientWithPaginationSchema.safeParse(raw);

    if (!success) {
      throw CustomError.internalServer(
        CustomError.getErrorMessage(error, "patient-mapper.ts: (fromBdToDomain)")
      );
    }
    return {
      page: data.page,
      limit: data.limit,
      total: data.total,
      pages: data.pages,
      data: data.data.map(this.map)
    };
  }

  static getFilters(query: Request["query"]): PatientFilters {
    const { rut, name, email, status, page, limit } = query;

    const { status: statusQuery, ...parsedQueries } = parseQuery(
      { rut, name, email, status, page, limit },
      { page: "1", limit: "10" }
    );

    return {
      ...parsedQueries,
      status: statusQuery as UserStatus | undefined
    };
  }
}
