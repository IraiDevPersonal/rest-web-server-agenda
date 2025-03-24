import { PatientEntity } from "@patients/domain/entities/patient_entity";
import { PrismaClient } from "@prisma/client";

export class PatientService {
  private readonly db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  async findByRutOrEmail(rut: string, email: string) {
    return await this.db.patients.findFirst({
      where: { OR: [{ email, rut }] },
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
        address: patientLike.address,
      },
    });
  }

  async create(patient: PatientEntity) {
    const patientCreated = await this.db.patients.create({
      data: {
        rut: patient.rut,
        names: patient.names,
        last_names: patient.last_names,
        email: patient.email,
        phone: patient.phone,
        address: patient.address,
      },
    });

    // console.log(patientCreated);
    return patientCreated;
  }
}
