import { PrismaClient } from "@prisma/client";
import { ProfessionalFilters } from "@professionals/domain/entities/professional_filters";
import { ProfessionFilters } from "@professions/domain/entities/profession_filters";

export class ProfessionalService {
  private readonly db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  async getMany(filters: ProfessionalFilters) {
    return await this.db.professionals.findMany({
      where: {
        id: filters?.id,
        user: {
          OR: [
            { names: { contains: filters?.name, mode: "insensitive" } },
            { last_names: { contains: filters?.name, mode: "insensitive" } },
          ],
        },
        professional_profession: {
          some: {
            profession_id: filters?.profession_id,
          },
        },
      },
    });
  }

  async getProfessionalToFilter(filters: ProfessionalFilters) {
    return await this.db.professionals.findMany({
      select: {
        id: true,
        user: {
          select: {
            names: true,
            last_names: true,
          },
        },
      },
      where: {
        professional_profession: {
          some: {
            profession_id: filters?.profession_id,
          },
        },
      },
    });
  }
}
