import { MakeRequired, PaginatedQuery, PaginatedResult } from "@/types/global";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { PatientFilters } from "./models/patient-filters.model";
import { PatientModel } from "./models/patient.model";

type FindPatientProps = Partial<{ rut: string; email: string; uid: string }>;
type Filters = PaginatedQuery<Omit<PatientFilters, "page" | "limit">>;

export type PatientServiceImpl = {
  getPatientByUid: (uid: string) => Promise<unknown | null>;
  getPatients: (filters: Filters) => Promise<PaginatedResult>;
  createPatient: (patient: Omit<PatientModel, "uid">) => Promise<unknown>;
  updatePatient: (uid: string, patientLike: Partial<PatientModel>) => Promise<unknown>;
  findPatientByRutOrEmail: (props: FindPatientProps) => Promise<MakeRequired<FindPatientProps, "uid"> | null>;
};

export class PatientService implements PatientServiceImpl {
  private readonly db: PrismaClient;

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
        where: whereClause,
        orderBy: {
          last_names: "asc"
        },
        take,
        skip,
        select: {
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
        }
      })
    ]);

    return { data, total };
  }

  async getPatientByUid(uid: string, options?: Prisma.patientsDefaultArgs<DefaultArgs>) {
    return await this.db.patients.findUnique({
      where: { uid: uid },
      ...options
    });
  }

  async updatePatient(uid: string, patientLike: Partial<PatientModel>) {
    return await this.db.patients.update({
      where: { uid: uid },
      data: patientLike
    });
  }

  async createPatient(patient: Omit<PatientModel, "uid">) {
    return await this.db.patients.create({
      data: patient
    });
  }

  async findPatientByRutOrEmail({ email, rut, uid }: FindPatientProps) {
    return await this.db.patients.findFirst({
      select: { rut: !!rut, email: !!email, uid: true },
      where: { OR: [{ rut: rut }, { email: email }], NOT: { uid: uid } }
    });
  }
}
