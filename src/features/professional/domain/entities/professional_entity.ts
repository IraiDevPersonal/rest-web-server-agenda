import { z } from "zod";
import { ProfessionEntity } from "../../../profession/domain/entities/profession_entity";
import { ServiceProviderEntity } from "../../../serviceProvider/domain/entities/serviceProvider_entity";
import { UserEntity } from "../../../users/domain/entities/user_entity";
import { CustomError } from "../../../core/domain/custom.error";

const scheme = z.object({
  id: z.number().optional(),
  userId: z.number(),
  serviceProviderId: z.number().optional(),
});

type Init = {
  id?: number | undefined;
  userId: number;
  serviceProviderId?: number | undefined;
  user: UserEntity | undefined;
  serviceProvider: ServiceProviderEntity | undefined;
  professions: ProfessionEntity[] | undefined;
};

export class ProfessionalEntity {
  public id?: number | undefined;
  public userId: number;
  public serviceProviderId?: number | undefined;
  public user: UserEntity | undefined;
  public serviceProvider: ServiceProviderEntity | undefined;
  public professions: ProfessionEntity[] | undefined;

  public constructor(init: Init) {
    this.id = init.id;
    this.userId = init.userId;
    this.serviceProviderId = init.serviceProviderId;
    this.user = init.user;
    this.serviceProvider = init.serviceProvider;
    this.professions = init.professions;
  }

  static fromJson(object: Record<string, any>) {
    try {
      const { professions, serviceProvider, user } = object;
      const schema = scheme.parse(object);
      return new ProfessionalEntity({
        ...schema,
        professions,
        serviceProvider,
        user,
      });
    } catch (error) {
      throw CustomError.badRequest(`${error}`);
    }
  }
}
