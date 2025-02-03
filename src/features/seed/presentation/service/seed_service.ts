import { PrismaClient } from "@prisma/client";
import {
  appointment,
  patients,
  professionalProfession,
  professionals,
  professions,
  roles,
  schedules,
  serviceProvider,
  users,
} from "../../../users/data/seed";
import { SeedServiceModel } from "../../domain/model/seed_service_model";

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
        `TRUNCATE TABLE professional_professions RESTART IDENTITY CASCADE;`
      );
      await this.db.$executeRawUnsafe(
        `TRUNCATE TABLE professionals RESTART IDENTITY CASCADE;`
      );
      await this.db.$executeRawUnsafe(
        `TRUNCATE TABLE users RESTART IDENTITY CASCADE;`
      );
      await this.db.$executeRawUnsafe(
        `TRUNCATE TABLE patients RESTART IDENTITY CASCADE;`
      );
      await this.db.$executeRawUnsafe(
        `TRUNCATE TABLE service_providers RESTART IDENTITY CASCADE;`
      );
      await this.db.$executeRawUnsafe(
        `TRUNCATE TABLE service_provider_codes RESTART IDENTITY CASCADE;`
      );

      await this.db.$executeRawUnsafe(
        `TRUNCATE TABLE professions RESTART IDENTITY CASCADE;`
      );
      await this.db.$executeRawUnsafe(
        `TRUNCATE TABLE roles RESTART IDENTITY CASCADE;`
      );

      await this.db.roles.createMany({
        data: roles,
      });
      await this.db.professions.createMany({
        data: professions,
      });

      for (const sp of serviceProvider) {
        await this.db.service_providers.create({
          data: {
            name: sp.name,
            rut: sp.rut,
            service_provider_codes: {
              create:
                sp.serviceProviderCode?.map((spc) => ({
                  title: spc.title,
                  code: spc.code,
                })) ?? [],
            },
          },
        });
      }

      await this.db.professionals.createMany({
        data: professionals.map((p) => ({
          user_id: p.userId,
          service_provider_id: p?.serviceProviderId,
        })),
      });

      await this.db.professional_professions.createMany({
        data:
          professionalProfession.map((pp) => ({
            professional_id: pp.professionalId,
            profession_id: pp.professionId,
          })) ?? [],
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
