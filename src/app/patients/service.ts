import { CustomError } from "@/lib/custom-error";
import type { RutOrEmailQuery } from "@/types/global";
import { PrismaClient } from "@prisma/client";
import type { PaginatedPatientQueryFilters } from "./models/patient-filters.model";
import type { PatientModel } from "./models/patient.model";
import type { PatientServiceRepository } from "./repository";

export class PatientService implements PatientServiceRepository {
  private readonly db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  private appliedFilters = (filters: Partial<PaginatedPatientQueryFilters>) => {
    return {
      rut: {
        equals: filters.rut,
        mode: "insensitive"
      },
      ...(filters.name
        ? {
            OR: [
              {
                names: { contains: filters.name.trim(), mode: "insensitive" }
              },
              {
                last_names: {
                  contains: filters.name.trim(),
                  mode: "insensitive"
                }
              }
            ]
          }
        : {}),
      email: {
        contains: filters.email,
        mode: "insensitive"
      },
      status: {
        equals: filters.status
      }
    } as any;
  };

  private buildPatientFieldsSelector = () => {
    return {
      uid: true,
      email: true,
      rut: true,
      names: true,
      last_names: true,
      phone: true,
      address: true,
      status: true,
      birth_date: true,
      gender: true,
      id: true
    };
  };

  async getPatients({ skip, take, ...filters }: PaginatedPatientQueryFilters) {
    try {
      const [total, data] = await this.db.$transaction([
        this.db.patients.count({ where: this.appliedFilters(filters) }),
        this.db.patients.findMany({
          select: this.buildPatientFieldsSelector(),
          where: this.appliedFilters(filters),
          orderBy: { last_names: "asc" },
          take,
          skip
        })
      ]);

      return { data, total };
    } catch (error) {
      throw CustomError.bdError(error);
    }
  }

  async getPatientByUid(uid: string) {
    try {
      return await this.db.patients.findUnique({
        select: this.buildPatientFieldsSelector(),
        where: { uid: uid }
      });
    } catch (error) {
      throw CustomError.bdError(error);
    }
  }

  async updatePatient(uid: string, payload: Partial<PatientModel>) {
    try {
      return await this.db.patients.update({
        select: this.buildPatientFieldsSelector(),
        where: { uid: uid },
        data: payload
      });
    } catch (error) {
      throw CustomError.bdError(error);
    }
  }

  async createPatient(payload: Omit<PatientModel, "uid">) {
    try {
      return await this.db.patients.create({
        select: this.buildPatientFieldsSelector(),
        data: payload
      });
    } catch (error) {
      throw CustomError.bdError(error);
    }
  }

  async findPatientRutAndEmail({ email, rut, uid }: RutOrEmailQuery) {
    try {
      return await this.db.patients.findFirst({
        select: { rut: !!rut, email: !!email, uid: true },
        where: { OR: [{ rut: rut }, { email: email }], NOT: { uid: uid } }
      });
    } catch (error) {
      throw CustomError.bdError(error);
    }
  }
}
