import { CustomError } from "@core/domain/custom.error";
import { ProfessionalMapper } from "@professionals/domain/entities/professional_Mapper";
import { ScheduleSchema } from "@schedules/presentation/schemas/schedule_schema";

type Init = {
  id?: number | undefined;
  uid?: string | undefined;
  professional_id: number;
  date: Date;
  time_from: string;
  time_to: string;
  is_enabled: boolean;
  professional: ProfessionalMapper | undefined;
};

export class ScheduleMapper {
  public id?: number | undefined;
  public uid?: string | undefined;
  public professional_id: number;
  public date: Date;
  public time_from: string;
  public time_to: string;
  public is_enabled: boolean;
  public professional: ProfessionalMapper | undefined;

  private constructor(init: Init) {
    this.id = init.id;
    this.professional_id = init.professional_id;
    this.date = init.date;
    this.time_from = init.time_from;
    this.time_to = init.time_to;
    this.is_enabled = init.is_enabled;
    this.professional = init.professional;
  }

  static toResponse(
    object: Record<string, any>
  ): Omit<ScheduleMapper, "professional_id"> {
    return {
      uid: object["uid"],
      date: object["date"],
      time_from: object["time_from"],
      time_to: object["time_to"],
      is_enabled: object["is_enabled"],
      professional: ProfessionalMapper.toResponse(
        object["professional"]
      ) as ProfessionalMapper
    };
  }
  static fromJson(object: Record<string, any>) {
    const { professional } = object;

    try {
      const scheme = ScheduleSchema.parse(object);
      return new ScheduleMapper({ ...scheme, professional: professional });
    } catch (error) {
      throw CustomError.badRequest(`parse error: ${error}`);
    }
  }

  static scheduleDTO(object: Record<string, any>, action: "insert" | "update") {
    const schedule = ScheduleMapper.fromJson(object);

    delete schedule.professional;
    if (action === "insert") {
      delete schedule.id;
      delete schedule.uid;
    }

    if (action === "update" && !schedule.id) {
      throw CustomError.badRequest("Id es requerida para actualizar");
    }

    return schedule;
  }
}
