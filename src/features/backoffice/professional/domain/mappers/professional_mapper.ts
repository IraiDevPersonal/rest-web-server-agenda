import { z } from "zod";
import { ProfessionMapper } from "@professions/domain/entities/profession_Mapper";
import { ServiceProviderMapper } from "@serviceProviders/domain/entities/serviceProvider_Mapper";
import { UserMapper } from "@users/domain/entities/user_Mapper";
import { CustomError } from "@core/domain/custom.error";
import { ScheduleMapper } from "@schedules/domain/entities/schedule_Mapper";

const scheme = z.object({
  id: z.number().optional(),
  userId: z.number(),
  serviceProviderId: z.number().optional()
});

type Init = {
  id?: number | undefined;
  userId: number;
  serviceProviderId?: number | undefined;
  user: UserMapper | undefined;
  serviceProvider: ServiceProviderMapper | undefined;
  professions: ProfessionMapper[] | undefined;
  schedules: ScheduleMapper[] | undefined;
};

export class ProfessionalMapper {
  public id?: number | undefined;
  public userId: number;
  public serviceProviderId?: number | undefined;
  public user: UserMapper | undefined;
  public serviceProvider: ServiceProviderMapper | undefined;
  public professions: ProfessionMapper[] | undefined;
  public schedules: ScheduleMapper[] | undefined;

  public constructor(init: Init) {
    this.id = init.id;
    this.userId = init.userId;
    this.serviceProviderId = init.serviceProviderId;
    this.user = init.user;
    this.serviceProvider = init.serviceProvider;
    this.professions = init.professions;
    this.schedules = init.schedules;
  }

  static fromJson(object: Record<string, any>) {
    try {
      const { professions, serviceProvider, schedules, user } = object;
      const schema = scheme.parse(object);
      return new ProfessionalMapper({
        ...schema,
        professions,
        serviceProvider,
        schedules,
        user
      });
    } catch (error) {
      throw CustomError.badRequest(`${error}`);
    }
  }

  static toResponse(object: Record<string, any>) {
    return {
      userId: object?.["userId"],
      serviceProviderId: object?.["serviceProviderId"],
      user: object?.["user"]
        ? UserMapper.toResponse(object?.["user"])
        : undefined,
      schedules: object?.["schedules"]?.map(ScheduleMapper.toResponse) ?? [],
      serviceProvider: object?.["serviceProvider"]
        ? ServiceProviderMapper.toResponse(object?.["serviceProvider"])
        : undefined,
      professions: object?.["professions"]
    };
  }
}
