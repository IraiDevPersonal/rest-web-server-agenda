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
      is_deleted: {
        equals: filters.is_deleted
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
          address: true,
          is_deleted: true
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

  async findByRutOrEmail(rut: string, email: string, notId?: bigint) {
    return await this.db.patients.findFirst({
      where: { OR: [{ email, rut }], NOT: { id: notId } }
    });
  }

  async findByUid(
    uid: string,
    options?: Prisma.patientsDefaultArgs<DefaultArgs>
  ) {
    return await this.db.patients.findUnique({
      ...options,
      where: { uid: uid }
    });
  }

  async update(patientLike: Record<string, any>, id: bigint) {
    await this.db.patients.update({
      where: { id: id },
      data: {
        rut: patientLike.rut,
        names: patientLike.names,
        last_names: patientLike.last_names,
        email: patientLike.email,
        phone: patientLike.phone,
        address: patientLike.address
      }
    });
  }

  async create(patient: PatientModel) {
    const patientCreated = await this.db.patients.create({
      data: {
        rut: patient.rut,
        names: patient.names,
        last_names: patient.last_names,
        email: patient.email,
        phone: patient.phone,
        address: patient.address
      }
    });

    // console.log(patientCreated);
    return patientCreated;
  }
}
