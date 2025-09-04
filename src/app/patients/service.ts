import { RutOrEmailQuery, PaginatedQuery } from "@/types/global";
import { PrismaClient } from "@prisma/client";
import { PatientFilters } from "./models/patient-filters.model";
import { PatientModel } from "./models/patient.model";
import { PatientServiceRepository } from "./repository";

type Filters = PaginatedQuery<Omit<PatientFilters, "page" | "limit">>;

export class PatientService implements PatientServiceRepository<Filters> {
  private readonly db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  private appliedFilters = (filters: Partial<Filters>) => {
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

  async getPatients({ skip, take, ...filters }: Filters) {
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
  }

  async getPatientByUid(uid: string) {
    return await this.db.patients.findUnique({
      select: this.buildPatientFieldsSelector(),
      where: { uid: uid }
    });
  }

  async updatePatient(uid: string, payload: Partial<PatientModel>) {
    return await this.db.patients.update({
      select: this.buildPatientFieldsSelector(),
      where: { uid: uid },
      data: payload
    });
  }

  async createPatient(payload: Omit<PatientModel, "uid">) {
    return await this.db.patients.create({
      select: this.buildPatientFieldsSelector(),
      data: payload
    });
  }

  async findPatientRutAndEmail({ email, rut, uid }: RutOrEmailQuery) {
    return await this.db.patients.findFirst({
      select: { rut: !!rut, email: !!email, uid: true },
      where: { OR: [{ rut: rut }, { email: email }], NOT: { uid: uid } }
    });
  }
}
