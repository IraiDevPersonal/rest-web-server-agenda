import { PatientMapper } from "@patients/domain/entities/patient_Mapper";
import { PrismaClient } from "@prisma/client";
import { PatientFilters } from "./models/patient-filters";

export class PatientService {
  private readonly db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  async getPatients(filters: PatientFilters) {
    return await this.db.patients.findMany({
      select: {
        uid: true,
        email: true,
        rut: true,
        names: true,
        last_names: true,
        phone: true,
        address: true
      },
      where: {
        rut: {
          equals: filters.rut,
          mode: "insensitive"
        },
        names: {
          contains: filters.names,
          mode: "insensitive"
        },
        last_names: {
          contains: filters.last_names,
          mode: "insensitive"
        },
        email: {
          contains: filters.email,
          mode: "insensitive"
        }
      },
      orderBy: {
        last_names: "asc"
      }
    });
  }

  async findByRutOrEmail(rut: string, email: string, notId?: bigint) {
    return await this.db.patients.findFirst({
      where: { OR: [{ email, rut }], NOT: { id: notId } }
    });
  }

  async findByUid(uid: string) {
    return await this.db.patients.findUnique({ where: { uid: uid } });
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

  async create(patient: PatientMapper) {
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
