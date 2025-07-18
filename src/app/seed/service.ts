import { PrismaClient } from "@prisma/client";
import {
  appointments,
  patients,
  professionalProfession,
  professionals,
  professions,
  roles,
  schedules,
  serviceProvider,
  users
} from "./data/seed-data";

export class SeedService {
  private readonly db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  async createSeed(): Promise<void> {
    try {
      await this.db.$executeRawUnsafe(
        `TRUNCATE TABLE "schedules" RESTART IDENTITY CASCADE;`
      );
      await this.db.$executeRawUnsafe(
        `TRUNCATE TABLE "appointment" RESTART IDENTITY CASCADE;`
      );
      await this.db.$executeRawUnsafe(
        `TRUNCATE TABLE "professional_professions" RESTART IDENTITY CASCADE;`
      );
      await this.db.$executeRawUnsafe(
        `TRUNCATE TABLE "professionals" RESTART IDENTITY CASCADE;`
      );
      await this.db.$executeRawUnsafe(
        `TRUNCATE TABLE "users" RESTART IDENTITY CASCADE;`
      );
      await this.db.$executeRawUnsafe(
        `TRUNCATE TABLE "patients" RESTART IDENTITY CASCADE;`
      );
      await this.db.$executeRawUnsafe(
        `TRUNCATE TABLE "service_providers" RESTART IDENTITY CASCADE;`
      );
      await this.db.$executeRawUnsafe(
        `TRUNCATE TABLE "service_provider_codes" RESTART IDENTITY CASCADE;`
      );

      await this.db.$executeRawUnsafe(
        `TRUNCATE TABLE "professions" RESTART IDENTITY CASCADE;`
      );
      await this.db.$executeRawUnsafe(
        `TRUNCATE TABLE "roles" RESTART IDENTITY CASCADE;`
      );

      await this.db.roles.createMany({
        data: roles
      });
      await this.db.professions.createMany({
        data: professions
      });

      await this.db.users.createMany({
        data: users.map((user) => {
          // createMany no soporta la creación de relaciones anidadas.
          // Debemos pasar solo los campos escalares del modelo User.
          // El objeto `user` contiene una propiedad `role` anidada, causando el error.
          // La eliminamos antes de pasar los datos a Prisma, dejando solo los datos válidos.
          // const { role, ...userData } = user;
          delete user.role;
          return user;
        })
      });

      for (const sp of serviceProvider) {
        await this.db.service_providers.create({
          data: {
            name: sp.name,
            rut: sp.rut,
            service_provider_codes: {
              create:
                sp.service_provider_codes?.map((spc) => ({
                  title: spc.title,
                  code: spc.code
                })) ?? []
            }
          }
        });
      }

      await this.db.professionals.createMany({
        data: professionals.map((p) => ({
          user_id: p.user_id,
          service_provider_id: p.service_provider?.id
        }))
      });

      await this.db.professional_professions.createMany({
        data:
          professionalProfession.map((pp) => ({
            professional_id: pp.professional_id,
            profession_id: pp.profession_id
          })) ?? []
      });

      await this.db.patients.createMany({
        data: patients
      });
      await this.db.schedules.createMany({
        data: schedules
      });
      await this.db.appointment.createMany({
        data: appointments
      });
    } catch (error) {
      console.error("Failed to create seed:", error);
      throw error;
    }
  }
}
