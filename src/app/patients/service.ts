import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { PatientModel } from "./models/patient.model";
import { PatientFilters } from "./models/patient-filters.model";
import { BdPatient } from "@/types/bd-model";
import { ResponseWithPagination } from "@/types/global";

export type PatientServiceImpl = {
  getPatients: (filters: PatientFilters) => Promise<ResponseWithPagination<BdPatient>>;
  getPatientByUid: (
    uid: string,
    options?: Prisma.patientsDefaultArgs<DefaultArgs>
  ) => Promise<BdPatient | null>;
  createPatient: (patient: Omit<PatientModel, "uid">) => Promise<unknown>;
  updatePatient: (uid: string, patientLike: Partial<PatientModel>) => Promise<BdPatient>;
  findPatientByRutOrEmail: (
    props: Partial<{ rut: string; email: string; uid: string }>
  ) => Promise<(Partial<{ rut: string; email: string }> & { uid: string }) | null>;
};

export class PatientService implements PatientServiceImpl {
  private readonly db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  async getPatients({ page = 1, limit = 10, ...filters }: PatientFilters) {
    const skip = (page - 1) * limit;

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
        },
        where: whereClause,
        orderBy: {
          last_names: "asc"
        },
        take: limit,
        skip
      })
    ]);

    const pages = Math.ceil(total / limit);

    return { data, total, page, pages, limit };
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

  async findPatientByRutOrEmail({ email, rut, uid }: Partial<{ rut: string; email: string; uid: string }>) {
    return await this.db.patients.findFirst({
      select: { rut: !!rut, email: !!email, uid: true },
      where: { OR: [{ rut: rut }, { email: email }], NOT: { uid: uid } }
    });
  }
}
