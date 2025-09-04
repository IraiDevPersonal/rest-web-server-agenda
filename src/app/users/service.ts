import { PaginatedQuery, RutOrEmailQuery } from "@/types/global";
import { PrismaClient } from "@prisma/client";
import type { UserFilters } from "./models/user-filters.model";
import { UpsertUserPayload } from "./models/user-payload.model";
import { UserServiceRepository } from "./repository";
import { ROLE_ID } from "./utils/constants";

type Filters = PaginatedQuery<Omit<UserFilters, "page" | "limit">>;

type UserServiceOptions = {
  includeProfessions?: boolean;
};

export class UserService implements UserServiceRepository<Filters> {
  protected readonly db: PrismaClient;
  protected shouldIncludeProfessions: boolean;

  constructor(options?: UserServiceOptions) {
    this.db = new PrismaClient();
    this.shouldIncludeProfessions = options?.includeProfessions ?? false;
  }

  protected buildProfessionFieldSelector = () => {
    return this.shouldIncludeProfessions
      ? {
          select: {
            profession: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      : false;
  };

  protected buildUserDetailFieldsSelector = () => {
    return {
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
      professions: this.buildProfessionFieldSelector()
    };
  };

  protected appliedFilters = (filters: Partial<Filters>) => {
    return {
      id: filters?.id,
      names: { contains: filters?.names, mode: "insensitive" },
      last_names: { contains: filters?.last_names, mode: "insensitive" },
      rut: { equals: filters?.rut, mode: "insensitive" },
      ...(filters.profession_id &&
        this.shouldIncludeProfessions && {
          professions: {
            some: {
              profession_id: filters?.profession_id
            }
          }
        })
    };
  };

  protected getProfessionalRoleFilter = () => {
    return this.shouldIncludeProfessions
      ? {
          some: {
            role_id: ROLE_ID.PROFESSIONAL
          }
        }
      : {};
  };

  create = async (payload: UpsertUserPayload) => {
    return await this.db.users.create({
      data: payload,
      select: this.buildUserDetailFieldsSelector()
    });
  };

  update = async (uid: string, payload: Partial<UpsertUserPayload>) => {
    return await this.db.users.update({
      where: { uid },
      data: payload,
      select: this.buildUserDetailFieldsSelector()
    });
  };

  updateProfessions = async (uid: string, professionIds: number[]) => {
    if (professionIds.length === 0) return;

    return this.db.users.update({
      where: { uid },
      data: {
        professions: {
          deleteMany: {},
          create: professionIds.map((professionId) => ({
            profession_id: professionId
          }))
        }
      },
      select: this.buildUserDetailFieldsSelector()
    });
  };

  updateRoles = async (uid: string, roleIds: number[]) => {
    if (roleIds.length === 0) return;

    return this.db.users.update({
      where: { uid },
      data: {
        roles: {
          deleteMany: {},
          create: roleIds.map((roleId) => ({
            role_id: roleId
          }))
        }
      },
      select: this.buildUserDetailFieldsSelector()
    });
  };

  findByRutOrEmail = async ({ email, rut, uid }: RutOrEmailQuery) => {
    return await this.db.users.findFirst({
      select: { rut: !!rut, email: !!email, uid: true },
      where: { OR: [{ rut: rut }, { email: email }], NOT: { uid: uid } }
    });
  };

  getAll = async ({ skip, take, ...filters }: Filters) => {
    const whereClause: any = {
      ...this.appliedFilters(filters),
      roles: this.getProfessionalRoleFilter()
    };

    const [totalCount, data] = await this.db.$transaction([
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
          professions: this.buildProfessionFieldSelector()
        }
      })
    ]);

    return { data, total: totalCount };
  };

  getByUid = async (uid: string) => {
    return await this.db.users.findFirst({
      select: this.buildUserDetailFieldsSelector(),
      where: {
        uid: uid
      }
    });
  };
}
