import { PaginatedQuery, PaginatedResult } from "@/types/global";
import { PrismaClient } from "@prisma/client";
import type { ProfessionalFilters } from "./models/professional-filters.model";

type Filters = PaginatedQuery<Omit<ProfessionalFilters, "page" | "limit">>;

export type ProfessionalServiceImpl = {
  getProfessionalByUid: (uid: string) => Promise<unknown | null>;
  getProfessionals: (filters: Filters) => Promise<PaginatedResult>;
  getProfessionalsForFilters: (filters: ProfessionalFilters) => Promise<unknown[]>;
};

export class ProfessionalService implements ProfessionalServiceImpl {
  private readonly db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  async getProfessionals({ skip, take, ...filters }: Filters) {
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
        where: whereClause,
        take,
        skip,
        select: {
          avatar_image: true,
          password: true,
          address: true,
          names: true,
          uid: true,
          status: true,
          rut: true,
          phone: true,
          last_names: true,
          gender: true,
          email: true,
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
        }
      })
    ]);

    return { data, total };
  }

  async getProfessionalByUid(uid: string) {
    return await this.db.users.findFirst({
      select: {
        avatar_image: true,
        address: true,
        names: true,
        uid: true,
        status: true,
        rut: true,
        phone: true,
        password: true,
        last_names: true,
        email: true,
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
            profession: {
              select: {
                id: true
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
