import { FindRutAndEmailQuery, MakeRequired, PaginatedQuery, PaginatedResult } from "@/types/global";
import { PrismaClient } from "@prisma/client";
import { PatientFilters } from "./models/patient-filters.model";
import { PatientModel } from "./models/patient.model";

type Filters = PaginatedQuery<Omit<PatientFilters, "page" | "limit">>;

export type PatientServiceImpl = {
  getPatientByUid: (uid: string) => Promise<unknown | null>;
  getPatients: (filters: Filters) => Promise<PaginatedResult>;
  createPatient: (payload: Omit<PatientModel, "uid">) => Promise<unknown>;
  updatePatient: (uid: string, payload: Partial<PatientModel>) => Promise<unknown>;
  findPatientRutAndEmail: (
    props: FindRutAndEmailQuery
  ) => Promise<MakeRequired<FindRutAndEmailQuery, "uid"> | null>;
};

export class PatientService implements PatientServiceImpl {
  private readonly db: PrismaClient;
  private readonly SELECT = {
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

  constructor() {
    this.db = new PrismaClient();
  }

  async getPatients({ skip, take, ...filters }: Filters) {
    const whereClause: any = {
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
    };

    const [total, data] = await this.db.$transaction([
      this.db.patients.count({ where: whereClause }),
      this.db.patients.findMany({
        orderBy: { last_names: "asc" },
        select: this.SELECT,
        where: whereClause,
        take,
        skip
      })
    ]);

    return { data, total };
  }

  async getPatientByUid(uid: string) {
    return await this.db.patients.findUnique({
      where: { uid: uid },
      select: this.SELECT
    });
  }

  async updatePatient(uid: string, payload: Partial<PatientModel>) {
    return await this.db.patients.update({
      where: { uid: uid },
      data: payload,
      select: this.SELECT
    });
  }

  async createPatient(payload: Omit<PatientModel, "uid">) {
    return await this.db.patients.create({
      data: payload,
      select: this.SELECT
    });
  }

  async findPatientRutAndEmail({ email, rut, uid }: FindRutAndEmailQuery) {
    return await this.db.patients.findFirst({
      select: { rut: !!rut, email: !!email, uid: true },
      where: { OR: [{ rut: rut }, { email: email }], NOT: { uid: uid } }
    });
  }
}
