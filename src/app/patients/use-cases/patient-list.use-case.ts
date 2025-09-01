import { queryParser } from "@/lib/utils";
import { UserStatus } from "@prisma/client";
import { Request } from "express";
import { PatientMapper } from "../mappers/patient.mapper";
import { PatientFilters } from "../models/patient-filters.model";
import { PatientServiceImpl } from "../service";
import { Pagination } from "@/lib/pagination";

export class PatientListUseCases {
  private readonly service: PatientServiceImpl;

  constructor(service: PatientServiceImpl) {
    this.service = service;
  }

  list = async (query: Request["query"]) => {
    const { page, limit, ...filters } = this.buildFilters(query);
    const pagination = new Pagination({ page, limit });

    const { data, total } = await this.service.getPatients(pagination.withFilters(filters));

    return PatientMapper.fromBdToDomain({
      data,
      total,
      page: pagination.page,
      limit: pagination.limit,
      pages: pagination.getTotalPages(total)
    });
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
