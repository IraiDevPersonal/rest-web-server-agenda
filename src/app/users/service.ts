import { CustomError } from "@/lib/custom-error";
import type { RutOrEmailQuery } from "@/types/global";
import { PrismaClient } from "@prisma/client";
import type { PaginatedUserQueryFilters } from "./models/user-filters.model";
import type { UpsertUserPayload } from "./models/user-payload.model";
import type { UserServiceRepository } from "./repository";
import { ROLE_ID } from "./utils/constants";

type UserServiceOptions = {
  includeProfessions?: boolean;
};

export class UserService implements UserServiceRepository {
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

  protected appliedFilters = (filters: Partial<PaginatedUserQueryFilters>) => {
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
    try {
      return await this.db.users.create({
        data: payload,
        select: this.buildUserDetailFieldsSelector()
      });
    } catch (error) {
      throw CustomError.bdError(error);
    }
  };

  update = async (uid: string, payload: Partial<UpsertUserPayload>) => {
    try {
      return await this.db.users.update({
        where: { uid },
        data: payload,
        select: this.buildUserDetailFieldsSelector()
      });
    } catch (error) {
      throw CustomError.bdError(error);
    }
  };

  updateProfessions = async (uid: string, professionIds: number[]) => {
    try {
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
    } catch (error) {
      throw CustomError.bdError(error);
    }
  };

  updateRoles = async (uid: string, roleIds: number[]) => {
    try {
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
    } catch (error) {
      throw CustomError.bdError(error);
    }
  };

  findByRutOrEmail = async ({ email, rut, uid }: RutOrEmailQuery) => {
    try {
      return await this.db.users.findFirst({
        select: { rut: !!rut, email: !!email, uid: true },
        where: { OR: [{ rut: rut }, { email: email }], NOT: { uid: uid } }
      });
    } catch (error) {
      throw CustomError.bdError(error);
    }
  };

  getAll = async ({ skip, take, ...filters }: PaginatedUserQueryFilters) => {
    try {
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
    } catch (error) {
      throw CustomError.bdError(error);
    }
  };

  getByUid = async (uid: string) => {
    try {
      return await this.db.users.findFirst({
        select: this.buildUserDetailFieldsSelector(),
        where: {
          uid: uid
        }
      });
    } catch (error) {
      throw CustomError.bdError(error);
    }
  };
}
