import { PrismaClient } from "@prisma/client";
import { ProfessionFilters } from "./models/profession-filters.model";
import { BdProfession } from "@/types/bd-model";

type Professions = BdProfession<{
  select: {
    id: true;
    name: true;
  };
}>[];

export type ProfessionServiceImpl = {
  getProfessions: (filters?: ProfessionFilters) => Promise<Professions>;
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
