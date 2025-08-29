import { PrismaClient } from "@prisma/client";
import { ProfessionFilters } from "./models/profession-filters.model";

export type ProfessionServiceImpl = {
  getProfessions: (filters?: ProfessionFilters) => Promise<unknown>;
};

export class ProfessionService implements ProfessionServiceImpl {
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
