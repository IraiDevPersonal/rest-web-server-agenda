import { CustomError } from "../../../core/domain/custom.error";
import { UserEntity } from "../../../users/domain/entities/user_entity";
import { ScheduleSchema } from "../../presentation/schemas/schedule_schema";

export type WeekDay =
  | "LUNES"
  | "MARTES"
  | "MIERCOLES"
  | "JUEVES"
  | "VIERNES"
  | "SABADO"
  | "DOMINGO";

type Init = {
  id: number;
  professional_id: number;
  week_day: WeekDay;
  time_from: string;
  time_to: string;
  is_enabled: boolean;
  professional: UserEntity;
};

export class ScheduleEntity {
  private id: number;
  private professional_id: number;
  private week_day: WeekDay;
  private time_from: string;
  private time_to: string;
  private is_enabled: boolean;
  private professional: UserEntity;

  private constructor(init: Init) {
    this.id = init.id;
    this.professional_id = init.professional_id;
    this.week_day = init.week_day;
    this.time_from = init.time_from;
    this.time_to = init.time_to;
    this.is_enabled = init.is_enabled;
    this.professional = init.professional;
  }

  static fromObject(object: Record<string, any>) {
    const { professional } = object;

    try {
      const scheme = ScheduleSchema.parse(object);
      return new ScheduleEntity({ ...scheme, professional: professional });
    } catch (error) {
      throw CustomError.badRequest(`${error}`);
    }
  }
}
