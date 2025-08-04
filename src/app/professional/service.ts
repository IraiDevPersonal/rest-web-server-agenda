import { PrismaClient } from "@prisma/client";
import type { ProfessionalFilters } from "./models/professional-filters";
import { ResponseWithPagination } from "@/types/global";

export class ProfessionalService {
  private readonly db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  async getProfessionals({
    page = 1,
    limit = 10,
    ...filters
  }: ProfessionalFilters): Promise<ResponseWithPagination<any>> {
    const skip = (page - 1) * limit;

    const whereClause: any = {
      id: filters?.id,
      user: {
        names: { contains: filters?.names, mode: "insensitive" },
        last_names: { contains: filters?.last_names, mode: "insensitive" },
        rut: { equals: filters?.rut, mode: "insensitive" }
      },
      professional_profession: {
        some: {
          profession_id: filters?.profession_id
        }
      }
    };

    const [total, data] = await this.db.$transaction([
      this.db.professionals.count({ where: whereClause }),
      this.db.professionals.findMany({
        select: {
          // id: true,
          user: {
            omit: {
              password: true,
              role_id: true
            },
            include: {
              role: {
                select: {
                  name: true,
                  id: true
                }
              }
            }
          },
          professional_profession: {
            select: {
              professions: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          }
        },
        where: whereClause,
        take: limit,
        skip
      })
    ]);

    const pages = Math.ceil(total / limit);

    return { data, total, page, pages, limit };
  }

  async getProfessionalsForFilters(filters: ProfessionalFilters) {
    return await this.db.professionals.findMany({
      select: {
        id: true,
        user: {
          select: {
            names: true,
            last_names: true
          }
        },
        professional_profession: {
          select: {
            profession_id: true
          }
        }
      },
      where: {
        professional_profession: {
          some: {
            profession_id: filters?.profession_id
          }
        }
      }
    });
  }
}
