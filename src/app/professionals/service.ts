import { FindRutAndEmailQuery, MakeRequired, PaginatedQuery, PaginatedResult } from "@/types/global";
import { PrismaClient } from "@prisma/client";
import type { ProfessionalFilters } from "./models/professional-filters.model";
import { ProfessionaPayload } from "./models/professional-payload.model";

type Filters = PaginatedQuery<Omit<ProfessionalFilters, "page" | "limit">>;

export type ProfessionalServiceImpl = {
  getProfessionalByUid: (uid: string) => Promise<unknown | null>;
  getProfessionals: (filters: Filters) => Promise<PaginatedResult>;
  getProfessionalsForFilters: (filters: ProfessionalFilters) => Promise<unknown[]>;
  createProfessional: (payload: ProfessionaPayload) => Promise<unknown>;
  updateProfessional: (uid: string, payload: Partial<ProfessionaPayload>) => Promise<unknown>;
  findProfessionalRutAndEmail: (
    props: FindRutAndEmailQuery
  ) => Promise<MakeRequired<FindRutAndEmailQuery, "uid"> | null>;
};

export class ProfessionalService implements ProfessionalServiceImpl {
  private readonly db: PrismaClient;
  private readonly DETAIL_SELECTOR = {
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
    gender: true,
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
  };

  constructor() {
    this.db = new PrismaClient();
  }

  async createProfessional({ roles, professions, ...payload }: ProfessionaPayload) {
    return await this.db.users.create({
      data: {
        ...payload,
        roles: {
          create: roles.map((role_id) => ({
            role_id
          }))
        },
        professions: {
          create: professions.map((profession_id) => ({
            profession_id
          }))
        }
      },
      select: this.DETAIL_SELECTOR
    });
  }

  async updateProfessional(uid: string, { professions, roles, ...payload }: Partial<ProfessionaPayload>) {
    // Si no hay roles ni profesiones que actualizar, solo actualizar campos básicos
    if (!roles && !professions) {
      return await this.db.users.update({
        where: { uid },
        data: payload,
        select: this.DETAIL_SELECTOR
      });
    }

    // Si hay roles o profesiones, usar transacción para actualizar todo
    return await this.db.$transaction(async (tx) => {
      // 1. Actualizar campos básicos del usuario
      const updatedUser = await tx.users.update({
        where: { uid },
        data: payload
      });

      // 2. Actualizar roles si se proporcionan
      if (roles && roles.length > 0) {
        // Eliminar roles existentes
        await tx.users_roles.deleteMany({
          where: { user_id: updatedUser.id }
        });

        // Crear nuevos roles
        await tx.users_roles.createMany({
          data: roles.map((roleId) => ({
            user_id: updatedUser.id,
            role_id: roleId
          }))
        });
      }

      // 3. Actualizar profesiones si se proporcionan
      if (professions && professions.length > 0) {
        // Eliminar profesiones existentes
        await tx.professional_professions.deleteMany({
          where: { user_id: updatedUser.id }
        });

        // Crear nuevas profesiones
        await tx.professional_professions.createMany({
          data: professions.map((professionId) => ({
            user_id: updatedUser.id,
            profession_id: professionId
          }))
        });
      }

      // 4. Retornar usuario actualizado con relaciones
      return await tx.users.findUnique({
        where: { uid },
        select: this.DETAIL_SELECTOR
      });
    });
  }

  async findProfessionalRutAndEmail({ email, rut, uid }: FindRutAndEmailQuery) {
    return await this.db.users.findFirst({
      select: { rut: !!rut, email: !!email, uid: true },
      where: { OR: [{ rut: rut }, { email: email }], NOT: { uid: uid } }
    });
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
      select: this.DETAIL_SELECTOR,
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
