import { ResponseWithPagination } from "@/types/global";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { PatientModel } from "./models/patient";
import { PatientFilters } from "./models/patient-filters";

export class PatientService {
  private readonly db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  async getPatients({
    page = 1,
    limit = 10,
    ...filters
  }: PatientFilters): Promise<ResponseWithPagination<any>> {
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

    const [total, patients] = await this.db.$transaction([
      this.db.patients.count({ where: whereClause }),
      this.db.patients.findMany({
        select: {
          uid: true,
          email: true,
          rut: true,
          names: true,
          last_names: true,
          phone: true,
          address: true
        },
        where: whereClause,
        orderBy: {
          last_names: "asc"
        },
        take: limit,
        skip
      })
    ]);

    const totalPages = Math.ceil(total / limit);

    return { data: patients, total, page, pages: totalPages, limit };
  }

  async getPatientDetail(uid: string, options?: Prisma.patientsDefaultArgs<DefaultArgs>) {
    return await this.db.patients.findUnique({
      ...options,
      where: { uid: uid }
    });
  }

  async updatePatient(uid: string, patientLike: Partial<PatientModel>) {
    return await this.db.patients.update({
      where: { uid: uid },
      data: {
        rut: patientLike.rut,
        names: patientLike.names,
        last_names: patientLike.last_names,
        email: patientLike.email,
        phone: patientLike.phone,
        address: patientLike.address,
        birth_date: patientLike.birth_date,
        gender: patientLike.gender,
        status: patientLike.status
      }
    });
  }

  async createPatient(patient: PatientModel) {
    const patientCreated = await this.db.patients.create({
      data: {
        rut: patient.rut,
        names: patient.names,
        last_names: patient.last_names,
        email: patient.email,
        phone: patient.phone,
        address: patient.address,
        gender: patient.gender,
        birth_date: patient.birth_date,
        status: patient.status
      }
    });

    // console.log(patientCreated);
    return patientCreated;
  }

  async findPatientByRutOrEmail({
    email,
    rut,
    id
  }: {
    rut?: string;
    email?: string;
    id?: bigint;
  }) {
    return await this.db.patients.findFirst({
      select: { id: !!id, rut: !!rut, email: !!email },
      where: { OR: [{ rut: rut }, { email: email }], NOT: { id: id } }
    });
  }
}
