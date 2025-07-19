import { PrismaClient } from "@prisma/client";
import { ProfessionFilters } from "./models/profession-filters";

export class ProfessionService {
  private readonly db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  async getProfessions({ id }: ProfessionFilters) {
    return await this.db.professions.findMany({
      where: {
        id: id
      }
    });
  }
}
