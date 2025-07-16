import { PrismaClient } from "@prisma/client";
import { ProfessionFilters } from "@professions/domain/mappers/profession_filters";

export class ProfessionService {
  private readonly db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  async getMany(filters: ProfessionFilters) {
    return await this.db.professions.findMany({
      where: {
        id: filters?.id,
        name: {
          contains: filters?.name,
          mode: "insensitive"
        }
      }
    });
  }
}
