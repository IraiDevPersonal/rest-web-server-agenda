import { PrismaClient } from "@prisma/client";
import type { ProfessionalFilters } from "./models/professional-filters.model";
import { ResponseWithPagination } from "@/types/global";
import { BdUser } from "@/types/bd-model";

type Professional = BdUser<{
  select: {
    address: true;
    names: true;
    uid: true;
    status: true;
    rut: true;
    phone: true;
    password: true;
    last_names: true;
    email: true;
    roles: {
      select: {
        role: {
          select: {
            id: true;
            name: true;
          };
        };
      };
    };
    professions: {
      select: {
        profession: {
          select: {
            id: true;
            name: true;
          };
        };
      };
    };
  };
}>;

type ProfessionalForFilter = BdUser<{
  select: {
    id: true;
    names: true;
    last_names: true;
    professions: {
      select: {
        profession: {
          select: {
            id: true;
          };
        };
      };
    };
  };
}>;

export type ProfessionalServiceImpl = {
  getProfessionalByUid: (uid: string) => Promise<Professional | null>;
  getProfessionals: (filters: ProfessionalFilters) => Promise<ResponseWithPagination<BdUser[]>>;
  getProfessionalsForFilters: (filters: ProfessionalFilters) => Promise<ProfessionalForFilter[]>;
};

export class ProfessionalService implements ProfessionalServiceImpl {
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
        },
        where: whereClause,
        take: limit,
        skip
      })
    ]);

    const pages = Math.ceil(total / limit);

    return { data, total, page, pages, limit };
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
