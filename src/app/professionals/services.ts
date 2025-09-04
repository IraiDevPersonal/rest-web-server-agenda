import { CustomError } from "@/lib/custom-error";
import { UserFilters } from "../users/models/user-filters.model";
import { UserService } from "../users/service";
import { ProfessionalServiceRepository } from "./repository";

export class ProfessionalService extends UserService implements ProfessionalServiceRepository {
  constructor() {
    super({ includeProfessions: true });
  }

  getForFilters = async (filters: Pick<UserFilters, "profession_id">) => {
    try {
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
          ...this.appliedFilters(filters).professions,
          roles: this.getProfessionalRoleFilter()
        }
      });
    } catch (error) {
      throw CustomError.bdError();
    }
  };
}
