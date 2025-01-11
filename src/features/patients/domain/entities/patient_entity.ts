import { CustomError } from "../../../core/domain/custom.error";
import { ScheduleSchema } from "../../../schedule/presentation/schemas/schedule_schema";
import { patientSchema } from "../../presentation/schemas/patient_schema";

type Init = {
  id?: number | undefined;
  uid?: string | undefined;
  rut: string;
  names: string;
  last_names: string;
  email: string;
  phone: string;
};

export class PatientEntity {
  public id?: number | undefined;
  public uid?: string | undefined;
  public rut: string;
  public names: string;
  public last_names: string;
  public email: string;
  public phone: string;

  private constructor(init: Init) {
    this.id = init.id;
    this.uid = init.uid;
    this.rut = init.rut;
    this.names = init.names;
    this.last_names = init.last_names;
    this.email = init.email;
    this.phone = init.phone;
  }

  static toResponse(object: Record<string, any>): PatientEntity {
    return {
      uid: object["uid"],
      rut: object["rut"],
      names: object["names"],
      last_names: object["last_names"],
      email: object["email"],
      phone: object["phone"],
    };
  }

  static fromJson(object: Record<string, any>) {
    try {
      const schema = patientSchema.parse(object);
      return new PatientEntity(schema);
    } catch (error) {
      throw CustomError.badRequest(`${error}`);
    }
  }
}
