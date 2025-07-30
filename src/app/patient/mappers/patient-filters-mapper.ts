import { Request } from "express";
import { PatientFilters } from "../models/patient-filters";

export class PatientFiltersMapper {
  public static getFilters(req: Request): PatientFilters {
    const { rut, name, email, status, page = "1", limit = "10" } = req.query;

    return {
      rut: rut as string | undefined,
      name: name as string | undefined,
      email: email as string | undefined,
      is_deleted: status ? status === "inactive" : undefined,
      page: !isNaN(Number(page)) && Number(page) > 0 ? Number(page) : 1,
      limit: !isNaN(Number(limit)) && Number(limit) > 0 ? Number(limit) : 10
    };
  }
}
