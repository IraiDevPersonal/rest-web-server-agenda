import { CustomError } from "../../../core/domain/custom.error";
import { appointmentStatusSchema } from "../../presentation/schema/appointment-status_schema";

type Init = {
  id?: number | undefined;
  name: string;
};

export class AppointmentStatusEntity {
  public id?: number | undefined;
  public name: string;

  private constructor(init: Init) {
    this.id = init.id;
    this.name = init.name;
  }

  static fromJson(object: Record<string, any>) {
    try {
      const schema = appointmentStatusSchema.parse(object);
      return new AppointmentStatusEntity(schema);
    } catch (error) {
      throw CustomError.badRequest(`${error}`);
    }
  }
}
