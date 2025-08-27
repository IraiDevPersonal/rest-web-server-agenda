import { ResponseWithPagination } from "@/types/global";
import { Request } from "express";
import { PatientMapper } from "../mappers/patient.mapper";
import { PatientModel } from "../models/patient.model";
import { PatientServiceImpl } from "../service";
import { PatientFilters } from "../models/patient-filters.model";
import { UserStatus } from "@prisma/client";
import { queryParser } from "@/lib/utils";

export class PatientListUseCase {
  private readonly service: PatientServiceImpl;

  constructor(service: PatientServiceImpl) {
    this.service = service;
  }

  list = async (query: Request["query"]): Promise<ResponseWithPagination<PatientModel>> => {
    const filters = this.buildFilters(query);
    const result = await this.service.getPatients(filters);

    return PatientMapper.fromBdToDomain(result);
  };

  private buildFilters(query: Request["query"]): PatientFilters {
    const { rut, name, email, status, page, limit } = query;

    const { status: statusQuery, ...parsedQueries } = queryParser(
      { rut, name, email, status, page, limit },
      { page: "1", limit: "10" }
    );

    return {
      ...parsedQueries,
      status: statusQuery as UserStatus | undefined
    };
  }
}
