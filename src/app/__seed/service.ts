import { CustomError } from "@/lib/custom-error";
import { PrismaClient } from "@prisma/client";
import {
  appointments,
  patients,
  professionalProfession,
  professions,
  roles,
  users,
  usersRoles
} from "./data/seed-data";

export class SeedService {
  private readonly db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  async createSeed(): Promise<void> {
    try {
      await this.db.$executeRawUnsafe(`TRUNCATE TABLE "appointments" RESTART IDENTITY CASCADE;`);

      await this.db.$executeRawUnsafe(`TRUNCATE TABLE "professional_professions" RESTART IDENTITY CASCADE;`);
      await this.db.$executeRawUnsafe(`TRUNCATE TABLE "users" RESTART IDENTITY CASCADE;`);
      await this.db.$executeRawUnsafe(`TRUNCATE TABLE "patients" RESTART IDENTITY CASCADE;`);
      await this.db.$executeRawUnsafe(`TRUNCATE TABLE "professions" RESTART IDENTITY CASCADE;`);
      await this.db.$executeRawUnsafe(`TRUNCATE TABLE "roles" RESTART IDENTITY CASCADE;`);
      await this.db.$executeRawUnsafe(`TRUNCATE TABLE "users_roles" RESTART IDENTITY CASCADE;`);

      await this.db.roles.createMany({
        data: roles
      });
      await this.db.professions.createMany({
        data: professions
      });

      await this.db.users.createMany({
        data: users
      });

      await this.db.users_roles.createMany({
        data: usersRoles
      });

      await this.db.professional_professions.createMany({
        data: professionalProfession
      });

      await this.db.patients.createMany({
        data: patients
      });
      await this.db.appointments.createMany({
        data: appointments
      });
    } catch (error) {
      throw CustomError.bdError();
    }
  }
}
