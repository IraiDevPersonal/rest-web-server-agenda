import { PrismaClient } from "@prisma/client";
import { ProfessionFilters } from "./models/profession-filters.model";
import { ProfessionServiceRepository } from "./repository";

export class ProfessionService implements ProfessionServiceRepository {
  private readonly db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  async getProfessions(filters?: ProfessionFilters) {
    return await this.db.professions.findMany({
      select: {
        id: true,
        name: true
      },
      where: {
        id: filters?.id
      }
    });
  }
}
