import { PrismaClient } from "@prisma/client";
import { SeedServiceModel } from "../../domain/model/seed_service_model";
import {
  appointment,
  appointmentsStatus,
  patients,
  roles,
  schedules,
  users,
} from "../data/seed";

export class SeedService implements SeedServiceModel {
  private readonly db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  async createSeed(): Promise<void> {
    try {
      await this.db.$executeRawUnsafe(
        `TRUNCATE TABLE schedules RESTART IDENTITY CASCADE ;`
      );
      await this.db.$executeRawUnsafe(
        `TRUNCATE TABLE appointment RESTART IDENTITY CASCADE;`
      );
      await this.db.$executeRawUnsafe(
        `TRUNCATE TABLE patients RESTART IDENTITY CASCADE;`
      );
      await this.db.$executeRawUnsafe(
        `TRUNCATE TABLE users RESTART IDENTITY CASCADE;`
      );
      await this.db.$executeRawUnsafe(
        `TRUNCATE TABLE appointment_status RESTART IDENTITY CASCADE;`
      );
      await this.db.$executeRawUnsafe(
        `TRUNCATE TABLE roles RESTART IDENTITY CASCADE;`
      );

      await this.db.roles.createMany({
        data: roles,
      });

      await this.db.appointment_status.createMany({
        data: appointmentsStatus,
      });
      await this.db.users.createMany({
        data: users,
      });
      await this.db.patients.createMany({
        data: patients,
      });
      await this.db.schedules.createMany({
        data: schedules,
      });
      await this.db.appointment.createMany({
        data: appointment,
      });
    } catch (error) {
      throw new Error("Error" + error);
    }
  }
}
