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
      names: { contains: filters?.names, mode: "insensitive" },
      last_names: { contains: filters?.last_names, mode: "insensitive" },
      rut: { equals: filters?.rut, mode: "insensitive" },
      professions: {
        some: {
          profession_id: filters?.profession_id
        }
      }
    };

    const [total, data] = await this.db.$transaction([
      this.db.users.count({ where: whereClause }),
      this.db.users.findMany({
        select: {
          // id: true,
          password: true,
          roles: {
            select: {
              role: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          },
          professions: {
            select: {
              profession: {
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

  async getProfessionalDetail(uid: string) {
    return await this.db.users.findFirst({
      select: {
        // id: true;
        password: true,
        roles: {
          select: {
            role: {
              select: {
                id: true,
                name: true
              }
            }
          }
        },
        professions: {
          select: {
            profession: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      },
      where: {
        uid: uid
      }
    });
  }

  async getProfessionalsForFilters(filters: ProfessionalFilters) {
    return await this.db.users.findMany({
      select: {
        id: true,
        names: true,
        last_names: true,
        professions: {
          select: {
            profession_id: true,
            profession: {
              select: {
                name: true
              }
            }
          }
        }
      },
      where: {
        professions: {
          some: {
            profession_id: filters?.profession_id
          }
        }
      }
    });
  }
}
