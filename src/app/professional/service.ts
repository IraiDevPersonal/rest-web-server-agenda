import { PrismaClient } from "@prisma/client";
import type { ProfessionalFilters } from "../professional/models/professional";

export class ProfessionalService {
  private readonly db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  async getProfessionals(filters: ProfessionalFilters) {
    return await this.db.professionals.findMany({
      where: {
        id: filters?.id,
        user: {
          OR: [
            { names: { contains: filters?.names, mode: "insensitive" } },
            { last_names: { contains: filters?.last_names, mode: "insensitive" } },
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

  async getProfessionalsToFilter(filters: ProfessionalFilters) {
    return await this.db.professionals.findMany({
      select: {
        id: true,
        user: {
          select: {
            names: true,
            last_names: true,
          },
        },
        professional_profession: {
          select: {
            profession_id: true,
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
