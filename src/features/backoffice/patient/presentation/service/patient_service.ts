import { PatientEntity } from "@patients/domain/entities/patient_entity";
import { PrismaClient } from "@prisma/client";

export class PatientService {
  private readonly db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
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

    console.log(patientCreated);
    // return PatientEntity.fromJson(patientCreated);
  }
}
